import { Chain, ChainAction, ChainMiddleware, ExecuteChain } from 'fluid-chains';
import { CREATE_EXPORT_CSV } from './Chain.info';
import { ExportTracker, Util } from '../chains/';

import { GDSDomainDTO } from 'gds-config';

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

export const init = () => {
    new CreateExportCsv();
}