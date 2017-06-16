import { CREATE_IMPORT_CSV } from './Chain.info';
import DomainApi from './DomainApi';
import { ExecuteChain } from 'fluid-chains';
import { init } from './Import';

export const API = '/api/import/';
export default class ImportResource {
    constructor(app) {
        new DomainApi();
        init();
        app.post(API + 'create-import-csv', function (req, res) {
            ExecuteChain(CREATE_IMPORT_CSV, {}, result => {

            });
        });

    }
}