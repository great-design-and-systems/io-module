import { DownloadFile, UploadSingleFile } from './File';

import Chains from './Chain.info';
import DomainApi from './DomainApi';
import FileResource from './FileResource';

const initChains = () => {
    new DomainApi();
    new UploadSingleFile();
    new DownloadFile();
}
module.exports = { FileResource, Chains, initChains };

