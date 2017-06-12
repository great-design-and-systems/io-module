import { CREATE_IMPORT_CSV } from './Chain.info';
import { ExecuteChain } from 'fluid-chains';

export const API = '/api/import/';
export default class ImportResource {
    constructor(app) {
        app.post(API + 'create-import-csv', function (req, res) {
            ExecuteChain(CREATE_IMPORT_CSV, {}, result => {

            });
        });

    }
}