import { Chain } from 'fluid-chains';
import { GET_FILE_INFO_FROM_URL } from './Chain.info';
import unirest from 'unirest';

const PROXY = process.env.PROXY;

const GetFileInfoFromURLChain = new Chain(GET_FILE_INFO_FROM_URL, (context, param, next) => {
    const url = param.fileURL();
    const headerRequest = unirest.head(url);
    if (PROXY) {
        headerRequest.proxy(PROXY);
    }
    headerRequest.end((response) => {
        if (!response.error || response.error === null) {
            context.set('fileType', response.headers['content-type']);
            context.set('fileSize', response.headers['content-length']);
            next();
        } else {
            next(response.error);
        }
    });
});

GetFileInfoFromURLChain.addSpec('fileURL').require();