import { Chain } from 'fluid-chains';
import { UPDATE_UPLOADED_FILE_BY_ID } from './Chain.info';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.findOneAndUpdate({fileId: param.fileId()}, param.data(), (err) => {
        next(err);
    });
}
const GetUploadedFileById = new Chain(UPDATE_UPLOADED_FILE_BY_ID, Action,
    undefined, FILE_ERROR_HANDLER);
GetUploadedFileById.addSpec('fileId', true);
GetUploadedFileById.addSpec('data', true);