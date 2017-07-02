import { DELETE_FILE, DOWNLOAD_FILE, GET_FILES, GET_FILE_DETAIL_BY_ID, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } from './Chain.info';

import File from './File';
import FileResource from './FileResource';

module.exports = { FileResource, FileChains: { DELETE_FILE, DOWNLOAD_FILE, GET_FILES, GET_FILE_DETAIL_BY_ID, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } };

