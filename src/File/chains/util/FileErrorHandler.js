import { Chain } from 'fluid-chains';
import { FILE_ERROR_HANDLER } from './Chain.info';
import { Logger } from 'gds-stack';

const Action = (context, param, next) => {
    console.log(param.$err());
    new Logger('ERROR: ' + context.$owner() + ': ' + param.$errorMessage())
        .error();
    next();
}
new Chain(FILE_ERROR_HANDLER, Action);