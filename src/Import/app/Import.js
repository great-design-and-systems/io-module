import { Chain, ExecuteChain } from 'fluid-chains';

import { CREATE_IMPORT_COLUMNS } from '../chains/columns/Chain.info';
import { CREATE_IMPORT_CSV } from './Chain.info';
import { CREATE_IMPORT_TRACKER } from '../chains/tracker/Chain.info';
import { PARSE_RAW_CSV } from '../chains/util/Chain.info';

class CreateImportCSV extends Chain {
    constructor() {
        super(CREATE_IMPORT_CSV, (context, param, next) => {
            ExecuteChain([PARSE_RAW_CSV, CREATE_IMPORT_TRACKER, CREATE_IMPORT_COLUMNS], {
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

new CreateImportCSV();