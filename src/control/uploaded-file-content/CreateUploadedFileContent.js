import { GDSAppLogger, GDSChain } from 'gds-config';

import UploadedFileContent from '../../entity/UploadedFileContent';

export default class CreateUploadedFileContent extends GDSChain {
    constructor(error, next) {
        super('CreateUploadedFileContent', Action, next, error);
    }
}

const Action = (context, param, done) => {
    UploadedFileContent.create({
        fileId: param.fileId(),
        content: param.content(),
        contentSequence: param.contentSequence()
    }, (err, result) => {
        if (err) {
            new GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('uploadedFileContentResult', result);
            done();
        }
    });
}