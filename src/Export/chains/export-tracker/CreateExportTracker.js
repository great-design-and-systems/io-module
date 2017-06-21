import { CREATE_EXPORT_TRACKER } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.create({
        description: param.description(),
        status: param.status(),
        progressCount: param.progressCount(),
        progressLimit: param.progressLimit(),
        updatedOn: param.updatedOn(),
        type: param.type(),
        fileId: param.fileId()
    }, (err, result) => {
        context.set('exportTracker', result);
        next(err);
    });
}

const CreateExportTracker = new Chain(CREATE_EXPORT_TRACKER,
    Action, undefined, EXPORT_ERROR_HANDLER);
CreateExportTracker.addSpec('description', true);
CreateExportTracker.addSpec('status', true);
CreateExportTracker.addSpec('progressCount', true);
CreateExportTracker.addSpec('progressLimit', true);
CreateExportTracker.addSpec('updatedOn', true);
CreateExportTracker.addSpec('type', true);
CreateExportTracker.addSpec('fileId', true);