import { Chain } from 'fluid-chains';
import { GET_IMPORT_TRACKER_BY_ID } from './Chain.info';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';
import { Tracker } from '../entity/';

const Action = (context, param, next) => {
    Tracker.findById(param.importId(), (err, tracker) => {
        context.set('tracker', tracker);
        next(err);
    });
}
const GetImportTrackerById = new Chain(GET_IMPORT_TRACKER_BY_ID, Action,
    undefined, IMPORT_ERROR_HANDLER);
GetImportTrackerById.addSpec('importId', true);