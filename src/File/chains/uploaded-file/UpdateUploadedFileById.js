import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { UPDATE_UPLOADED_FILE_BY_ID } from './Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.findByIdAndUpdate(param.fileId(), param.uploadedFileInputUpdate(), (err) => {
        next(err);
    });
}
const GetUploadedFileById = new Chain(UPDATE_UPLOADED_FILE_BY_ID, Action,
    undefined, FILE_ERROR_HANDLER);
GetUploadedFileById.addSpec('fileId', true);
GetUploadedFileById.addSpec('uploadedFileInputUpdate', true);