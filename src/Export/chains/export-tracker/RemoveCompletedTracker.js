import { REMOVE_COMPLETED_TRACKER } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.remove({status: 'COMPLETED'}, err => {
        next(err);
    });
}

const RemoveCompletedTracker = new Chain(REMOVE_COMPLETED_TRACKER,
    Action, undefined, EXPORT_ERROR_HANDLER);