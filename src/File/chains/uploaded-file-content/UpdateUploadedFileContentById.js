import { Chain } from 'fluid-chains';
import { UPDATE_UPLOADED_FILE_CONTENT_BY_ID } from './Chain.info';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { UploadedFileContent } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFileContent.findOneAndUpdate({fileId: param.fileId()}, {content: param.content()}, (err) => {
        next(err);
    });
}
const GetUploadedFileContentById = new Chain(UPDATE_UPLOADED_FILE_CONTENT_BY_ID, Action,
    undefined, FILE_ERROR_HANDLER);
GetUploadedFileContentById.addSpec('fileId', true);
GetUploadedFileContentById.addSpec('content', true);