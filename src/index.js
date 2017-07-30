import { ClusterChains, DatabaseChains, ExpressApp, GDSDomainResource, Logger, LoggerChains, ServerChains } from 'gds-stack';

import { ExecuteChain } from 'fluid-chains';
import { FileResource } from './app/';

const PORT = process.env.PORT || 5000;
const DB = process.env.DB || 'io-module-db';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

ExecuteChain([
    ClusterChains.CLUSTER_CONFIG,
    LoggerChains.LOGGER_CONFIG,
    DatabaseChains.MONGO_CONFIG,
    DatabaseChains.MONGO_CONNECT,
    ServerChains.GDS_SERVER_CONFIG,
    ServerChains.GDS_SERVER_CONNECT_MULTIPARTY,
    ServerChains.GDS_SERVER_HTTP_LISTENER], {
        mongo_databaseName: DB,
        mongo_host: DB_HOST,
        mongo_port: DB_PORT,
        mongo_user: DB_USER,
        mongo_password: DB_PASSWORD,
        mongo_retry: 5,
        logger_name: 'IO',
        logger_filePath: 'io-module.log',
        server_port: PORT,
        server_tempDir: process.env.TEMP_DIR || 'uploads'
    }, (result) => {
        if (!result.$err) {
            Logger('IO').info(`Server is connected in port ${PORT}`);
            const IOResource = new GDSDomainResource(ExpressApp, 'api');
            new FileResource(IOResource);
            ExpressApp.get('/api', (req, res) => {
                res.status(200).send(IOResource.getDTO(req));
            });
        }
    });




