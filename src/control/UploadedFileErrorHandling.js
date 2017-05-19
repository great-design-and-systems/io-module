import { GDSAppLogger, GDSChains } from 'gds-config';

export default class UploadedFileErrorHandling extends GDSChains {
    constructor(callback) {
        super('UploadedFileErrorHandling', Action, next, error);
    }
}

const Action = (context, param) => {
    new GDSAppLogger('Failed on chain: ', param.$name());
    new GDSAppLogger(param.$errorMessage).error();
    callback(param.$errorMessage());
}