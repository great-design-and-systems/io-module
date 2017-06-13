import { CREATE_UPLOADED_FILE_CONTENT } from './Chain.info';
import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { UploadedFileContent } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFileContent.create({
        fileId: param.fileId(),
        fileData: param.content(),
        contentSequence: 0
    }, (err, result) => {
        context.set('fileId', param.fileId());
        context.set('fileContentId', result._id);
        next(err);
    });
}

const CreateUploadedFileContent = new Chain(CREATE_UPLOADED_FILE_CONTENT,
    Action, undefined, FILE_ERROR_HANDLER);
CreateUploadedFileContent.addSpec('fileId', true);
CreateUploadedFileContent.addSpec('fileData', true);