import { CREATE_UPLOADED_FILE } from './Chain.info';
import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.create({
        fileName: param.fileName(),
        fileType: param.fileType(),
        fileSize: param.fileSize(),
        createdBy: param.createdBy()
    }, (err, result) => {
        context.set('uploadedFile', result);
        next(err);
    });
}

const CreateUploadedFile = new Chain(CREATE_UPLOADED_FILE,
    Action, undefined, FILE_ERROR_HANDLER);
CreateUploadedFile.addSpec('fileName', true);
CreateUploadedFile.addSpec('fileType', true);
CreateUploadedFile.addSpec('fileSize', true);
CreateUploadedFile.addSpec('createdBy', true);