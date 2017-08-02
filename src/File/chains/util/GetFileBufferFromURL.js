import { GET_FILE_BUFFER_FROM_URL } from './Chain.info';
import { chain } from 'fluid-chains';
import convertStream from 'convert-stream';
import fs from 'node-fs';
import unirest from 'unirest';

const PROXY = process.env.PROXY;

const GetFileBufferFromURLChain = new chain(GET_FILE_BUFFER_FROM_URL, (context, param, next) => {
    const url = param.fileURL();
    const fileId = param.fileId();
    const gerRequest = unirest.get(url);
    const filename = `${__dirname}/../../../../uploads/${fileId}`;
    const writeStream = fs.createWriteStream(filename);
    if (PROXY) {
        gerRequest.proxy(PROXY);
    }
    try {
        gerRequest.end().pipe(writeStream);
        writeStream.on('finish', () => {
            convertStream.toBuffer(fs.createReadStream(filename))
                .then((fileData) => {
                    context.set('fileData', fileData);
                    next();
                });
        });
    } catch (err) {
        next(err);
    }
});

GetFileBufferFromURLChain.addSpec('fileURL').require();
GetFileBufferFromURLChain.addSpec('fileId').require();