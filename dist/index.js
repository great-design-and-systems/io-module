'use strict';

var _fluidChains = require('fluid-chains');

var _gdsStack = require('gds-stack');

var _app = require('./app/');

var PORT = process.env.PORT || 5000;
var DB = process.env.DB || 'io-module-db';
var DB_HOST = process.env.DB_HOST || 'localhost';
var DB_PORT = process.env.DB_PORT || 27017;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
(0, _fluidChains.ChainStrictModeEnabled)();
(0, _fluidChains.ExecuteChain)([_gdsStack.ClusterChains.CLUSTER_CONFIG, _gdsStack.LoggerChains.LOGGER_CONFIG, _gdsStack.DatabaseChains.MONGO_CONFIG, _gdsStack.DatabaseChains.MONGO_CONNECT, _gdsStack.ServerChains.GDS_SERVER_CONFIG, _gdsStack.ServerChains.GDS_SERVER_CONNECT_MULTIPARTY, _gdsStack.ServerChains.GDS_SERVER_HTTP_LISTENER], {
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
}, function (result) {
    if (!result.$err) {
        (0, _gdsStack.Logger)('IO').info('Server is connected in port ' + PORT);
        var IOResource = new _gdsStack.GDSDomainResource(_gdsStack.ExpressApp, 'api');
        new _app.FileResource(IOResource);
        _gdsStack.ExpressApp.get('/api', function (req, res) {
            res.status(200).send(IOResource.getDTO(req));
        });
        _gdsStack.ExpressApp.get('/api/chains', function (req, res) {
            res.status(200).send((0, _fluidChains.ChainList)());
        });
    }
});