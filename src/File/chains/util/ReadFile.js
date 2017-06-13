import { Chain } from 'fluid-chains';
import { READ_FILE } from './Chain.info';
import fs from 'node-fs';

const Action = (context, param, next) => {
    fs.readFile(param.filePath(), (err, fileData) => {
        context.set('fileData', fileData);
        if (param.fileId) {
            context.set('fileId', param.fileId());
        }
        next(err);
    });
};
const ReadFile = new Chain(READ_FILE, Action);
ReadFile.addSpec('filePath', true);
ReadFile.addSpec('fileId', false, undefined, true);