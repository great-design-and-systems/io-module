import { Chain } from 'fluid-chains';
import { GDSAppLogger } from 'gds-config';
import UploadedFile from '../../entity/UploadedFile';

export default class CreateUploadedFile extends Chain {
    constructor() {
        super('CreateUploadedFile', Action, 'ReadUploadedFile', 'UploadedFileErrorHandling');
        this.addSpec('name', true);
        this.addSpec('type', true);
        this.addSpec('size', true);
        this.addSpec('createdBy', true);
    }
}

const Action = (context, param, done) => {
    UploadedFile.create({
        fileName: param.name(),
        fileType: param.type(),
        fileSize: param.size(),
        createdBy: param.createdBy()
    }, (err, result) => {
        if (err) {
            new GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('path', param.path());
            context.set('uploadedFileId', result._id);
            context.set('uploadedFile', result);
            done();
        }
    });
}