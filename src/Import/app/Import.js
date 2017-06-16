import { Chain, ExecuteChain } from 'fluid-chains';
import { Columns, Tracker, Util } from '../chains/';

import { CREATE_IMPORT_CSV } from './Chain.info';
import { Chains as FileChains } from '../../File/';

export class CreateImportCSV extends Chain {
    constructor() {
        super(CREATE_IMPORT_CSV, (context, param, next) => {
            ExecuteChain([FileChains.DOWNLOAD_FILE, Util.PARSE_RAW_CSV, Tracker.CREATE_IMPORT_TRACKER, Columns.CREATE_IMPORT_COLUMNS], {
                description: param.description(),
                type: 'csv_importer',
                dateFor: param.dataFor(),
                fileId: param.fileId()
            }, result => {
                context.set('importId', result.columns().importId);
                next(result.$err ? result.$err() : undefined);
            });
        });
        this.addSpec('description', true);
        this.addSpec('fieldId', true);
        this.addSpec('dataFor', true);
    }
}


export const init = () => {
    new CreateImportCSV();
}