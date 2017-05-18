import { API as FILE_API, FileResource } from './file';

export default class IOResource {
    constructor(app) {
        new FileResource(app);
    }
}