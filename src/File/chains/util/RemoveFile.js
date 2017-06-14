import { Chain } from 'fluid-chains';
import { REMOVE_FILE } from './Chain.info';
import fs from 'node-fs';

const Action = (context, param, next) => {
    fs.unlink(param.filePath(), (err) => {
        if (param.fileId) {
            context.set('fileId', param.fileId());
        }
        next(err);
    });
};
const RemoveFile = new Chain(REMOVE_FILE, Action);
RemoveFile.addSpec('filePath', true);
RemoveFile.addSpec('fileId', false);