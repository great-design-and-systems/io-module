import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { REMOVE_UPLOADED_FILE_BY_ID } from './Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.findByIdAndRemove(param.fileId(), err => {
        next(err);
    });
}
const RemoveUploadedFile = new Chain(REMOVE_UPLOADED_FILE_BY_ID, Action,
    undefined, FILE_ERROR_HANDLER);
RemoveUploadedFile.addSpec('fileId', true);