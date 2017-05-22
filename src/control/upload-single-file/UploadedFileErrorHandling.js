import { Chain } from 'fluid-chains';
import { GDSAppLogger } from 'gds-config';

export default class UploadedFileErrorHandling extends Chain {
    constructor() {
        super('UploadedFileErrorHandling', (context, param, next) => {
            console.log('UploadedFileErrorHandling');
            new GDSAppLogger('Failed on chain: ', param.$owner()).info();
            new GDSAppLogger(param.$errorMessage).error();
            next();
        });
    }
}
