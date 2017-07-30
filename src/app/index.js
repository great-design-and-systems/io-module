import { ExpressApp, GDSDomainResource } from 'gds-stack';
import { FileChains, FileResource } from '../File/';
import { ImportChains, ImportResource } from '../Import/';

const IOResource = new GDSDomainResource(ExpressApp, 'api');
new FileResource(IOResource);

module.exports = {
    FileChains,
    ImportChains,
    IOResource
};

