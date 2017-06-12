import { Chain } from 'fluid-chains';
import { GET_IMPORT_TRACKER_FAILED } from './Chain.info';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';
import { Tracker } from '../entity/';

const Action = (context, param, next) => {
    Tracker.find({
        status: 'FAILED'
    }, (err, result) => {
        context.set('trackers', result);
        next(err);
    });
}
new Chain(GET_IMPORT_TRACKER_FAILED, Action,
    undefined, IMPORT_ERROR_HANDLER);