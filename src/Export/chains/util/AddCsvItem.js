import { EXPORT_ERROR_HANDLER, ADD_CSV_ITEM } from './Chain.info';

import { Chain } from 'fluid-chains';
import CSVWriter from 'csv-write-stream';
import fs from 'node-fs';

const Action = (context, param, next) => {

    try {
        const header = !fs.existsSync(param.csvPath());
        const writer = CSVWriter({ sendHeaders: header });
        writer.pipe(fs.createWriteStream(param.csvPath(), { flags: 'a' }));
        writer.write(param.csvData());
        writer.end();
        context.set('csvInfo', { path: param.csvPath(), data: param.csvData() });
        next();
    } catch (err) {
        next(err);
    }
    
};
const AddCsvItem = new Chain(ADD_CSV_ITEM, Action,
    undefined, EXPORT_ERROR_HANDLER);
AddCsvItem.addSpec('csvPath', true);
AddCsvItem.addSpec('csvData', true);