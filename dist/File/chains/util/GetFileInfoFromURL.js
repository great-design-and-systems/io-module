'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROXY = process.env.PROXY;

var GetFileInfoFromURLChain = new _fluidChains.chain(_Chain.GET_FILE_INFO_FROM_URL, function (context, param, next) {
    var url = param.fileURL();
    var headerRequest = _unirest2.default.head(url);
    if (PROXY) {
        headerRequest.proxy(PROXY);
    }
    console.log('GetFileInfoFromURLChain...', url);
    headerRequest.end(function (response) {
        if (!response.error || response.error === null) {
            context.set('fileType', response.headers['content-type']);
            context.set('fileSize', response.headers['content-length']);
            next();
        } else {
            next(response.error);
        }
    });
});

GetFileInfoFromURLChain.addSpec('fileURL').require();