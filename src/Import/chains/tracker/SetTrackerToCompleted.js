import { Chain } from 'fluid-chains';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';
import { SET_TRACKER_TO_IN_COMPLETED } from './Chain.info';
import { Tracker } from '../../entity/';

const Action = (context, param, next) => {
    Tracker.findByIdAndUpdate(param.importId(), {
        status: 'COMPLETED'
    }, (err) => {
        next(err);
    });
}
const SetTrackerToInCompleted = new Chain(SET_TRACKER_TO_IN_COMPLETED, Action);
SetTrackerToInCompleted.addSpec('importId', true);