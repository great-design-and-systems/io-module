import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { REMOVE_UPLOADED_FILE_CONTENT } from './Chain.info';
import { UploadedFileContent } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFileContent.findOneAndRemove({fileId: param.fileId()}, err => {
        next(err);
    });
}
const RemoveUploadedFileContent = new Chain(REMOVE_UPLOADED_FILE_CONTENT, Action,
    undefined, FILE_ERROR_HANDLER);
RemoveUploadedFileContent.addSpec('fileId', true);