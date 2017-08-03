'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _convertStream = require('convert-stream');

var _convertStream2 = _interopRequireDefault(_convertStream);

var _nodeFs = require('node-fs');

var _nodeFs2 = _interopRequireDefault(_nodeFs);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROXY = process.env.PROXY;

var GetFileBufferFromURLChain = new _fluidChains.chain(_Chain.GET_FILE_BUFFER_FROM_URL, function (context, param, next) {
    var url = param.fileURL();
    var fileId = param.fileId();
    var getRequest = _unirest2.default.get(url);
    var filename = __dirname + '/../../../../uploads/' + fileId;
    var writeStream = _nodeFs2.default.createWriteStream(filename);
    if (PROXY) {
        getRequest.proxy(PROXY);
    }
    try {
        console.log('downloading...', url);
        getRequest.end().pipe(writeStream);
        writeStream.on('finish', function () {
            _convertStream2.default.toBuffer(_nodeFs2.default.createReadStream(filename)).then(function (fileData) {
                context.set('fileData', fileData);
                next();
            });
        });
    } catch (err) {
        console.log('downloading failed', err);
        next(err);
    }
});

GetFileBufferFromURLChain.addSpec('fileURL').require();
GetFileBufferFromURLChain.addSpec('fileId').require();