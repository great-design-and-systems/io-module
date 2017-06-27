import { CREATE_EXPORT_CSV, ADD_EXPORT_ITEM_CSV } from './Chain.info';

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

        this.put(ADD_EXPORT_ITEM_CSV, 'add-export-item-csv/:exportId', (req, res) => {
            ExecuteChain(ADD_EXPORT_ITEM_CSV, {
                exportId: req.params.exportId,
                item: req.body
            }, result => {
                const exportProgress = result.exportProgress();
                if (exportProgress.status() === 'COMPLETED') {
                    res.setHeader('Content-type', 'text/csv');
                    res.setHeader('Content-length', exportProgress.fileSize);
                    exportProgress.stream.pipe(res);
                } else {
                    res.status(result.statusCode()).send(result.dto());
                }
            });
        });
    }
}