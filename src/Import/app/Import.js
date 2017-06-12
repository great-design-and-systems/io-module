import { CREATE_IMPORT_COLUMNS } from '../chains/columns/Chain.info';
import { CREATE_IMPORT_TRACKER } from '../chains/tracker/Chain.info';
import { ExecuteChain } from 'fluid-chains';
import { PARSE_RAW_CSV } from '../chains/util/Chain.info';

export default class Import {
    createImportCsv(description, fileId, dataFor, rawEncoded, callback) {
        ExecuteChain([PARSE_RAW_CSV, CREATE_IMPORT_TRACKER, CREATE_IMPORT_COLUMNS],
            {
                description: description,
                type: 'csv_importer',
                dateFor: dataFor,
                fileId: fileId
            }, (result) => {
                if (result.$err) {
                    result(result.$err());
                } else {
                    callback(undefined, {
                        importId: result.columns().importId
                    });
                }
            });
    }
}