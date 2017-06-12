import { Chain } from 'fluid-chains';
import { GDSDomainDTO } from 'gds-config';

export default class DomainApi extends Chain {
    constructor() {
        super('ImportDomainApi', (context, param, next) => {
            const dto = param.dto ? param.dto() : new GDSDomainDTO();
            context.set('dto', dto);
            next();
        });
        this.addSpec('host', true);
        this.addSpec('protocol', true);
        this.addSpec('dto', false);
    }
}