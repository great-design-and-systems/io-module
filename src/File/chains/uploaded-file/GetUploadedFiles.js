import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from '../util/Chain.info';
import { GET_UPLOADED_FILES } from './Chain.info';
import { UploadedFile } from '../../entity/';

const Action = (context, param, next) => {
    UploadedFile.find({}, (err, result) => {
        context.set('files', result);
        next(err);
    });
}

const GetUploadedFiles = new Chain(GET_UPLOADED_FILES,
    Action, undefined, FILE_ERROR_HANDLER);