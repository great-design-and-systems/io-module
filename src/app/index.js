import { Chain, ExecuteChain } from 'fluid-chains';

import { ExportResource } from '../Export/';
import { FileResource } from '../File/';
import { GDSDomainDTO } from 'gds-config';
import { ImportResource } from '../Import/';

export class IOResource {
    constructor(app) {
        new ExportResource(app);
        new FileResource(app);
        new ImportResource(app);
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
