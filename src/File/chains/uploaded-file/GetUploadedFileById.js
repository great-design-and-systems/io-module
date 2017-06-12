import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { GET_UPLOADED_FILE_BY_ID } from './Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.findById(param.fileId(), (err, uploaded) => {
        context.set('uploadedFile', uploaded);
        next(err);
    });
}
const GetUploadedFileById = new Chain(GET_UPLOADED_FILE_BY_ID, Action,
    undefined, FILE_ERROR_HANDLER);
GetUploadedFileById.addSpec('fileId', true);