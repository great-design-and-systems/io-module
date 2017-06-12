import { Chain } from 'fluid-chains';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';
import { REMOVE_IMPORT_TRACKER } from './Chain.info';
import { Tracker } from '../entity/';

const Action = (context, param, next) => {
    Tracker.findByIdAndRemove(param.importId(), err => {
        next(err);
    });
}
const RemoveImportTracker = new Chain(REMOVE_IMPORT_TRACKER, Action,
    undefined, REMOVE_IMPORT_TRACKER);
RemoveImportTracker.addSpec('importId', true);