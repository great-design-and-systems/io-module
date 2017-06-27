import { EXPORT_ERROR_HANDLER, GET_CSV_FILE } from './Chain.info';

import { Chain } from 'fluid-chains';
import { GetDirectory } from './Helper';

import path from 'path';

const Action = (context, param, next) => {
    context.set('csvPath', path.join(GetDirectory(), param.exportId() + '.csv'));
    context.set('csvData', param.item());
    next();
};
const GetCsvFile = new Chain(GET_CSV_FILE, Action,
    undefined, EXPORT_ERROR_HANDLER);
GetCsvFile.addSpec('exportId', true);
GetCsvFile.addSpec('item', false);