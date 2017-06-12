import { Chain, ExecuteChain } from 'fluid-chains';
import { Chains as ImportChains, ImportResource } from '../Import/';

import { ExportResource } from '../Export/';
import { FileResource } from '../File/';
import { GDSDomainDTO } from 'gds-config';

const protocol = (req) => {
    return req.connection.encrypted ? 'https://' : 'http://'
};

export class IOResource {
    constructor(app) {
        new ExportResource(app);
        new FileResource(app);
        new ImportResource(app);
        app.get('/gds', (req, res) => {
            ExecuteChain([
                'ImportDomainApi',
                'ExportDomainApi',
                'FileDomainApi'
            ], { host: req.headers.host, protocol: protocol(req) },
                (result) => {
                    res.status(200).send(result.dto());
                });
        });
    }
}

export class IOResourceChain extends Chain {
    constructor() {
        super('IOResourceChain', (context, param, next) => {
            const domain = param.domain ? param.domain : [];
            const protocol = param.protocol();
            const host = param.host();
            ExecuteChain([
                'ImportDomainApi',
                'ExportDomainApi',
                'FileDomainApi'
            ], { host: host, protocol: protocol }, (result) => {
                domain.push(result.dto());
                context.set('domain', domain);
                next();
            });
        });
        this.addSpec('host', true);
        this.addSpec('protocol', true);
    }
}

export const IOChains = {
    ImportChains
}


