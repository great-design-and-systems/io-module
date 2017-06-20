import { Chain, ExecuteChain } from 'fluid-chains';
import { Chains as FileChains, FileResource } from '../File/';
import { Chains as ImportChains, ImportResource } from '../Import/';

import { ExportResource } from '../Export/';
import { GDSDomainDTO } from 'gds-config';

const protocol = (req) => {
    return req.connection.encrypted ? 'https://' : 'http://'
};

export class IOResource {
    constructor(app) {
        new ExportResource(app);
        const fileResource = new FileResource(app);
        const importResource = new ImportResource(app);
        app.get('/gds', (req, res) => {
            res.status(200).send({
                "import": importResource.getDTO(req),
                "file": fileResource.getDTO(req)
            });
        });

        this.getApi = (req) => {
            return {
                "import": importResource.getDTO(req),
                "file": fileResource.getDTO(req),
                "export": ""
            }
        }
    }
}

export const IOChains = {
    ImportChains,
    FileChains
}


