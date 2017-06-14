import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { REMOVE_EXPORT_TRACKER } from './Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.findByIdAndRemove(param.exportId(), err => {
        next(err);
    });
}
const RemoveExportTracker = new Chain(REMOVE_EXPORT_TRACKER, Action,
    undefined, EXPORT_ERROR_HANDLER);
RemoveExportTracker.addSpec('exportId', true);