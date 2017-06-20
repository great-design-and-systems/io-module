import { GDSResource, Post } from 'gds-config';

import { CREATE_IMPORT_CSV } from './Chain.info';
import { ExecuteChain } from 'fluid-chains';
import { init } from './Import';

export const API = 'api/import';
export default class ImportResource extends GDSResource {
    constructor(app) {
        super(app, API);
        init();
        this.post('createImportCsv', 'create-import-csv', function (req, res) {
            ExecuteChain(CREATE_IMPORT_CSV, {}, result => {

            });
        });
    }
}