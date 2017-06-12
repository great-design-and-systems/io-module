import { IMPORT_ERROR_HANDLER, PARSE_RAW_CSV } from './Chain.info';

import { Chain } from 'fluid-chains';
import parse from 'csv-parse';

const Action = (context, param, next) => {
    parse(param.rawCsvData(), {
        comment: '#'
    }, (err, data) => {
        context.set('parsedData', data);
        next(err);
    });
};
const ParseRawCSV = new Chain(PARSE_RAW_CSV, Action,
    undefined, IMPORT_ERROR_HANDLER);
ParseRawCSV.addSpec('rawCsvData', true, undefined, true);