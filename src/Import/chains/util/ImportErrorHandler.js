import { Chain } from 'fluid-chains';
import { GDSAppLogger } from 'gds-config';
import { IMPORT_ERROR_HANDLER } from './Chain.info';

const Action = (context, param, next) => {
    new GDSAppLogger('ERROR: ' + param.$errorFrom() + ': ' + param.$errorMessage())
        .error();
    next();
}
new Chain(IMPORT_ERROR_HANDLER, Action);