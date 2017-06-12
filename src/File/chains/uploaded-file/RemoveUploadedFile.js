import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { REMOVE_UPLOADED_FILE } from './Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.findByIdAndRemove(param.fileId(), err => {
        next(err);
    });
}
const RemoveUploadedFile = new Chain(REMOVE_UPLOADED_FILE, Action,
    undefined, REMOVE_UPLOADED_FILE);
RemoveUploadedFile.addSpec('fileId', true);