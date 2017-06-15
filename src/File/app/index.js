import { DownloadFile, UpdateSingleFileContent, UploadSingleFile } from './File';

import Chains from './Chain.info';
import DomainApi from './DomainApi';
import FileResource from './FileResource';

const initChains = () => {
    new DomainApi();
    new UploadSingleFile();
    new DownloadFile();
    new UpdateSingleFileContent();
}
module.exports = { FileResource, Chains, initChains };

