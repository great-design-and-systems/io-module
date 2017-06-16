import { DELETE_FILE, DOWNLOAD_FILE, GET_FILE_DETAIL_BY_ID, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } from './Chain.info';

import { API } from './FileResource';
import { Chain } from 'fluid-chains';
import { GDSDomainDTO } from 'gds-config';

export default class DomainApi extends Chain {
    constructor() {
        super('FileDomainApi', (context, param, next) => {
            const dto = param.dto ? param.dto() : new GDSDomainDTO();
            dto.addPost(UPLOAD_SINGLE_FILE, `${param.protocol()}${param.host()}${API}upload-single-file/:userId`);
            dto.addGet(DOWNLOAD_FILE, `${param.protocol()}${param.host()}${API}download-file/:fileId`);
            dto.addPost(UPDATE_SINGLE_FILE_CONTENT, `${param.protocol()}${param.host()}${API}update-single-file-content/:fileId`);
            dto.addDelete(DELETE_FILE, `${param.protocol()}${param.host()}${API}:fileId`);
            dto.addGet(GET_FILE_DETAIL_BY_ID, `${param.protocol()}${param.host()}${API}get-file-detail-by-id/:fileId`);
            context.set('dto', dto);
            next();
        });
        this.addSpec('host', true);
        this.addSpec('protocol', true);
        this.addSpec('dto', false);
    }
}