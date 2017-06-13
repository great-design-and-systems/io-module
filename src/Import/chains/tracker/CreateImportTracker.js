import { CREATE_IMPORT_TRACKER } from './Chain.info';
import { Chain } from 'fluid-chains';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';
import { Tracker } from '../../entity/';

const Action = (context, param, next) => {
    const parsedData = param.parsedData();
    Tracker.create({
        description: param.description(),
        type: param.type(),
        progressLimit: parsedData.length - 1,
        dataFor: param.dataFor(),
        fileId: param.fileId()
    }, (err, createdTracker) => {
        context.set('tracker', createdTracker);
        next(err);
    });
};

const CreateImportTracker = new Chain(CREATE_IMPORT_TRACKER, Action,
    undefined, IMPORT_ERROR_HANDLER);

CreateImportTracker.addSpec('description', true);
CreateImportTracker.addSpec('type', true);
CreateImportTracker.addSpec('dataFor', true);
CreateImportTracker.addSpec('fileId', true);
CreateImportTracker.addSpec('parsedData', true);