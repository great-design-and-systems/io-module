import { GDSAppLogger, GDSChain } from 'gds-config';

import UploadedFile from '../../entity/UploadedFile';

export default class CreateUploadFile extends GDSChain {
    constructor(error, next) {
        super('CreateUploadFile', Action, next, error);
    }
}

const Action = (context, param, done) => {
    UploadedFile.create({
        fileName: parent.name(),
        fileType: parent.type(),
        fileSize: parent.size(),
        createBy: parent.createBy()
    }, (err, result) => {
        if (err) {
            new GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('path', param.path());
            context.set('uploadedFileId', result._id);
            done();
        }
    });
}