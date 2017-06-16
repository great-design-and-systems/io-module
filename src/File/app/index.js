import { DeleteFile, DownloadFile, GetFileDetailById, UpdateSingleFileContent, UploadSingleFile } from './File';

import Chains from './Chain.info';
import DomainApi from './DomainApi';
import FileResource from './FileResource';

const initChains = () => {
    new DomainApi();
    new UploadSingleFile();
    new DownloadFile();
    new UpdateSingleFileContent();
    new DeleteFile();
    new GetFileDetailById();
}
module.exports = { FileResource, Chains, initChains };

