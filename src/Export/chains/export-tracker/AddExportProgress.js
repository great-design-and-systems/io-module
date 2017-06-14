import { ADD_EXPORT_PROGRESS } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.findById(param.exportId(), (err, exportTracker) => {
        if (exportTracker) {
            if (exportTracker.progressCount < exportTracker.progressLimit) {
                exportTracker.progressCount++;
                if (exportTracker.progressCount === 1) {
                    exportTracker.status = 'INPROGRESS';
                }
                if (exportTracker.progressCount === exportTracker.progressLimit) {
                    exportTracker.status = 'COMPLETED';
                }
            }
            ExportTracker.update({
                _id: param.exportId()
            }, exportTracker, (errUpdateTracker, updatedTracker) => {
                if (updatedTracker) {
                    updatedTracker.status = exportTracker.status;
                    updatedTracker.progressCount = exportTracker.progressCount;
                }
                context.set('exportTracker', updatedTracker);
                next(errUpdateTracker);
            });
        } else {
            context.set('exportTracker', exportTracker);
            next(err);
        }
    });
}

const AddExportProgress = new Chain(ADD_EXPORT_PROGRESS,
    Action, undefined, EXPORT_ERROR_HANDLER);
AddExportProgress.addSpec('exportId', true);