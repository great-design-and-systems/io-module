import { FAIL_EXPORT_TRACKER } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.findByIdAndUpdate(param.exportId(),
        { $set: { status: 'FAILED' } },
        { new: true }, // true to return the modified document rather than the original
        (err, updatedTracker) => {
            context.set('exportTracker', updatedTracker);
            next(err);
        });
}

const FailExportTracker = new Chain(FAIL_EXPORT_TRACKER,
    Action, undefined, EXPORT_ERROR_HANDLER);
FailExportTracker.addSpec('exportId', true);