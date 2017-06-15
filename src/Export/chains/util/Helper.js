import fs from 'node-fs';

const CSV_DIR = process.env.CSV_DIR || 'csv';

export const GetDirectory = () => {
    if (!fs.existsSync(CSV_DIR)) {
        fs.mkdirSync(CSV_DIR);
    }
    return CSV_DIR;
}