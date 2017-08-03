'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadedFileScheme = new _mongoose2.default.Schema({
    fileName: { type: String, required: [true, 'File name is required'] },
    fileType: { type: String, required: [true, 'File type is required.'] },
    fileSize: { type: Number, required: [true, 'File size is required.'] },
    createdBy: { type: String, required: [true, 'CreatedBy is required.'] },
    usedBy: { type: String },
    updatedBy: String,
    updatedOn: Date,
    createdOn: { type: Date, default: Date.now }
});

var model = _mongoose2.default.model('uploadedFile', uploadedFileScheme);

exports.default = model;