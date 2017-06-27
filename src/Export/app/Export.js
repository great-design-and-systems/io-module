import { Chain, ChainAction, ChainMiddleware, ExecuteChain } from 'fluid-chains';
import { CREATE_EXPORT_CSV, ADD_EXPORT_ITEM_CSV } from './Chain.info';
import { ExportTracker, Util } from '../chains/';

import { GDSDomainDTO } from 'gds-config';
import fs from 'fs-extra';

export class CreateExportCsv extends Chain {
    constructor() {
        super(CREATE_EXPORT_CSV, (context, param, next) => {
            ExecuteChain([ExportTracker.CREATE_EXPORT_TRACKER], {
                description: param.description(),
                type: 'csv_exporter',
                progressLimit: param.limit()
            }, (result) => {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new GDSDomainDTO('ERROR_' + CREATE_EXPORT_CSV, result.$errorMessage()));
                    next();
                } else {
                    const tracker = result.exportTracker();
                    context.set('status', 200);
                    context.set('dto', new GDSDomainDTO(CREATE_EXPORT_CSV, tracker._id));
                    next();
                }
            });
        });
        this.addSpec('description', true);
        this.addSpec('limit', true);
    }
}

export class AddExportItemCsv extends Chain {
    constructor() {
        super(ADD_EXPORT_ITEM_CSV, (context, param, next) => {
            ExecuteChain([Util.GET_CSV_FILE, Util.ADD_CSV_ITEM, ExportTracker.ADD_EXPORT_PROGRESS], {
                exportId: param.exportId(),
                item: param.item()
            }, (result) => {
                if (result.$err) {
                    context.set('statusCode', 500);
                    context.set('dto', new GDSDomainDTO('ERROR_' + ADD_EXPORT_ITEM_CSV, result.$errorMessage()));
                    next();
                } else {
                    if (result.status() == 'COMPLETED') {
                        ExecuteChain([Util.GET_CSV_FILE], {
                            exportId: param.exportId()
                        }, (csvResult) => {
                            if (csvResult.$err) {
                                context.set('statusCode', 500);
                                context.set('dto', new GDSDomainDTO('ERROR_' + ADD_EXPORT_ITEM_CSV, csvResult.$errorMessage()));
                                next();
                            } else {
                                const resultExportProgress = result.exportTracker();
                                resultExportProgress.stream = fs.createReadStream(csvResult.csvPath());
                                resultExportProgress.fileName = param.exportId() + '.csv';
                                resultExportProgress.stream.on('end', () => {
                                    fs.remove(csvResult.csvPath());
                                });
                                fs.stat(csvResult.csvPath(), (errStat, fileStat) => {
                                    if (errStat) {
                                        next(errStat);
                                    } else {
                                        resultExportProgress.fileSize = fileStat.size;
                                        context.set('statusCode', 200);
                                        context.set('exportProgress', resultExportProgress);
                                        next();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
        this.addSpec('exportId', true);
        this.addSpec('item', true);
    }
}

export const init = () => {
    new CreateExportCsv();
    new AddExportItemCsv();
}