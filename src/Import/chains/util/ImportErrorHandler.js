import { Chain } from 'fluid-chains';
import { IMPORT_ERROR_HANDLER } from './Chain.info';
import { Logger } from 'gds-stack';

const Action = (context, param, next) => {
    new Logger('ERROR: ' + param.$owner() + ': ' + param.$errorMessage())
        .error();
    next();
}
new Chain(IMPORT_ERROR_HANDLER, Action);