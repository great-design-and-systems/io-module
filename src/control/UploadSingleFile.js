import { GDSAppLogger, GDSChain } from 'gds-config';

export default class UploadSingleFile extends GDSChain {
    constructor(file, userId, next, ErrorEvent) {
        super('UploadedSingleFile', (context, param, done) => {
            context.set('name', file.originalname);
            context.set('type', file.mimetype);
            context.set('size', file.size);
            context.set('createdBy', userId);
            context.set('path', file.path);
            done();
        }, next, error);
    }
}