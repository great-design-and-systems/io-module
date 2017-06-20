import { Chain } from 'fluid-chains';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';
import { SET_TRACKER_TO_IN_PROGRESS } from './Chain.info';
import { Tracker } from '../../entity/';

const Action = (context, param, next) => {
    Tracker.findByIdAndUpdate(param.importId(), {
        status: 'INPROGRESS'
    }, (err) => {
        next(err);
    });
}
const SetTrackerToInProgress = new Chain(SET_TRACKER_TO_IN_PROGRESS, Action);
SetTrackerToInProgress.addSpec('importId', true);