import { CREATE_IMPORT_CSV } from './Chain.info';
import { ExecuteChain } from 'fluid-chains';

export default class ImportResource {
    constructor(resource) {
        resource.post(CREATE_IMPORT_CSV, 'create-import-csv', function (req, res) {
            ExecuteChain(CREATE_IMPORT_CSV, {}, result => {

            });
        });
    }
}