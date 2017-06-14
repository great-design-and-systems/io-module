import { GET_EXPORT_INPROGRESS } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.find()
        .where('status').equals('INPROGRESS')
        .sort('-createdOn')
        .exec((err, data) => {
            context.set('exportTrackers', data);
            next(err);
        });
}

const GetExportInprogress = new Chain(GET_EXPORT_INPROGRESS,
    Action, undefined, EXPORT_ERROR_HANDLER);