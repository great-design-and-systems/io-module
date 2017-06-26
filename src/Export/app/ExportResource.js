import { CREATE_EXPORT_CSV } from './Chain.info';

import { ExecuteChain } from 'fluid-chains';
import { GDSResource } from 'gds-config';
import { init } from './Export';

export const API = 'api/export';
export default class ExportResource extends GDSResource {
    constructor(app) {
        super(app, API);
        init();
        this.post(CREATE_EXPORT_CSV, 'create-export-csv', (req, res) => {
            const csvInfo = req.body;
            ExecuteChain(CREATE_EXPORT_CSV, {
                description: csvInfo.description,
                limit: csvInfo.limit
            }, result => res.status(result.status()).send(result.dto()));
        });
    }
}