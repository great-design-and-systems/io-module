import { API } from './FileResource';
import { Chain } from 'fluid-chains';
import { GDSDomainDTO } from 'gds-config';

export default class DomainApi extends Chain {
    constructor() {
        super('FileDomainApi', (context, param, next) => {
            const dto = param.dto ? param.dto() : new GDSDomainDTO();
            dto.addPost('uploadSingleFile', param.protocol() + param.host() + API + 'upload-single-file/:userId');
            context.set('dto', dto);
            next();
        });
        this.addSpec('host', true);
        this.addSpec('protocol', true);
        this.addSpec('dto', false);
    }
}