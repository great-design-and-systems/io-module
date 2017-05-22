import CreateUploadedFile from './CreateUploadedFile';
import CreateUploadedFileContent from './CreateUploadedFileContent';
import { ExecuteChain } from 'fluid-chains';
import ReadUploadedFile from './ReadUploadedFile';
import RemoveUploadedTempFile from './RemoveUploadedTempFile';
import UploadedFileErrorHandling from './UploadedFileErrorHandling';

(() => {
    new UploadedFileErrorHandling();
    new CreateUploadedFile();
    new CreateUploadedFileContent();
    new ReadUploadedFile();
    new RemoveUploadedTempFile();
})();

const execute = (file, userId, done) => {
    ExecuteChain('CreateUploadedFile', {
        name: file.originalFilename,
        type: file.type,
        size: file.size,
        createdBy: userId,
        path: file.path
    }, done);
}

export default execute;