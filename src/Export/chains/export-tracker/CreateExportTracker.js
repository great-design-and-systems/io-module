import { CREATE_EXPORT_TRACKER } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.create({
        description: param.description(),
        type: param.type(),
        progressLimit: param.progressLimit()
    }, (err, result) => {
        context.set('exportTracker', result);
        next(err);
    });
}

const CreateExportTracker = new Chain(CREATE_EXPORT_TRACKER,
    Action, undefined, EXPORT_ERROR_HANDLER);
CreateExportTracker.addSpec('description', true);
CreateExportTracker.addSpec('type', true);
CreateExportTracker.addSpec('progressLimit', true);