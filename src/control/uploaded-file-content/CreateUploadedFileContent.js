import { GDSAppLogger, GDSChain } from 'gds-config';

import UploadedFileContent from '../../entity/UploadedFileContent';
import fs from 'fs-extra';

export default class CreateUploadedFileContent extends GDSChain {
    constructor(error, next) {
        super('CreateUploadedFileContent', Action, next, error);
    }
}

const Action = (context, param, done) => {
    UploadedFileContent.create({
        fileId: param.uploadedFileId(),
        content: param.fileData(),
        contentSequence: param.contentSequence()
    }, (err, result) => {
        if (err) {
            fs.unlink(param.path());
            new GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('uploadedFileId', param.uploadedFileId());
            context.set('uploadedFileContentId', result._id);
            done();
        }
    });
}