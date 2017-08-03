import { Chain } from 'fluid-chains';
import { GET_FILE_BUFFER_FROM_URL } from './Chain.info';
import convertStream from 'convert-stream';
import fs from 'node-fs';
import unirest from 'unirest';

const PROXY = process.env.PROXY;

const GetFileBufferFromURLChain = new Chain(GET_FILE_BUFFER_FROM_URL, (context, param, next) => {
    const url = param.fileURL();
    const fileId = param.fileId();
    const getRequest = unirest.get(url);
    const filename = `${__dirname}/../../../../uploads/${fileId}`;
    const writeStream = fs.createWriteStream(filename);
    if (PROXY) {
        getRequest.proxy(PROXY);
    }
    getRequest.end().pipe(writeStream);
    writeStream.on('finish', () => {
        convertStream.toBuffer(fs.createReadStream(filename))
            .then((fileData) => {
                context.set('fileData', fileData);
                context.set('fileId', param.fileId ? param.fileId() : undefined);
                fs.unlink(filename);
                next();
            })
            .catch(err => {
                fs.unlink(filename);
                next(err);
            });
    });
    writeStream.on('error', (err) => {
        fs.unlink(filename);
        next(err);
    });
});

GetFileBufferFromURLChain.addSpec('fileURL').require();
GetFileBufferFromURLChain.addSpec('fileId').require();