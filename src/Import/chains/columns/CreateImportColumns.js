import { CREATE_IMPORT_COLUMNS } from './Chain.info';
import { Chain } from 'fluid-chains';
import { Columns } from '../../entity/';
import { IMPORT_ERROR_HANDLER } from '../util/Chain.info';

const Action = (context, param, next) => {
    Columns.create({
        importId: param.importId(),
        columns: param.columns()
    }, (err, columns) => {
        context.set('columns', columns);
        next(err);
    });
}

const CreateImportColumns = new Chain(CREATE_IMPORT_COLUMNS,
    Action, undefined, IMPORT_ERROR_HANDLER);
CreateImportColumns.addSpec('importId', true);
CreateImportColumns.addSpec('column', true);