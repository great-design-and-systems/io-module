import { Chain } from 'fluid-chains';
import { GDSAppLogger } from 'gds-config';
import { EXPORT_ERROR_HANDLER } from './Chain.info';

const Action = (context, param, next) => {
    new GDSAppLogger('ERROR: ' + param.$owner() + ': ' + param.$errorMessage())
        .error();
    next();
}
new Chain(EXPORT_ERROR_HANDLER, Action);