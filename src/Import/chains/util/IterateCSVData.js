import { IMPORT_ERROR_HANDLER, ITERATE_CSV_DATA } from './Chain.info';

import { Chain } from 'fluid-chains';
import batch from 'batchflow';

const Action = (context, param, done) => {
    var columns = [];
    batch(param.parsedData()).sequential()
        .each((i, item, next) => {
            if (i > 0) {
                //TODO: track(columns, item, i, next);
            } else {
                columns = item;
                next();
            }
        })
        .end(() => {
            done();
        });
};
const ChainAction = new Chain(PARSE_RAW_CSV, Action,
    undefined, IMPORT_ERROR_HANDLER);
ChainAction.addSpec('parsedData', true, undefined, true);