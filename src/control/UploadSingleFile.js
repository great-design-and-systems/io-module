import { GDSAppLogger, GDSChain } from 'gds-config';

export default class UploadSingleFile extends GDSChain {
    constructor(file, userId, next, ErrorEvent) {
        super('UploadedSingleFile', (context, param, done) => {
            context.set('file', file);
            context.set('userId', userId);
        }, next, error);
    }
}