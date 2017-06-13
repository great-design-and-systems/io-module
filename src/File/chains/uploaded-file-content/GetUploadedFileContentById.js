import { Chain } from 'fluid-chains';
import { GET_UPLOADED_FILE_CONTENT_BY_ID } from './Chain.info';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { UploadedFileContent } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFileContent.find({fileId: param.fileId()}, (err, uploaded) => {
        context.set('uploadedFileContent', uploaded);
        next(err);
    });
}
const GetUploadedFileContentById = new Chain(GET_UPLOADED_FILE_CONTENT_BY_ID, Action,
    undefined, FILE_ERROR_HANDLER);
GetUploadedFileContentById.addSpec('fileId', true);