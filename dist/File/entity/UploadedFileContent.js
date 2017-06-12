'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadedFileContentSchema = new _mongoose2.default.Schema({
    fileId: { type: String, required: [true, 'fileId is required.'] },
    content: { type: Buffer, required: [true, 'Content is required'] },
    contentSequence: Number,
    createdOn: { type: Date, default: Date.now }
});

var model = _mongoose2.default.model('UploadedFileContent', uploadedFileContentSchema);

exports.default = model;