import { CREATE_UPLOADED_FILE_CONTENT } from './Chain.info';
import { Chain } from 'fluid-chains';
import { UploadedFileContent } from '../../entity/';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';

const Action = (context, param, next) => {
    UploadedFileContent.create({
        fileId: param.fileId(),
        content: param.content(),
        contentSequence: param.contentSequence()
    }, (err, result) => {
        context.set('uploadedFileContent', result);
        next(err);
    });
}

const CreateUploadedFileContent = new Chain(CREATE_UPLOADED_FILE_CONTENT,
    Action, undefined, FILE_ERROR_HANDLER);
CreateUploadedFileContent.addSpec('fileId', true);
CreateUploadedFileContent.addSpec('content', true);
CreateUploadedFileContent.addSpec('contentSequence', true);