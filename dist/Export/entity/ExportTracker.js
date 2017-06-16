'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exportTrackerSchema = new _mongoose2.default.Schema({
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        default: 'NEW',
        enum: ['NEW', 'INPROGRESS', 'FAILED', 'COMPLETED']
    },
    progressCount: {
        type: Number,
        default: 0
    },
    progressLimit: {
        type: Number,
        required: [true, 'Progress limit is required.']
    },
    updatedOn: Date,
    type: {
        type: String,
        required: [true, 'Type is required.']
    },
    fileId: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var model = _mongoose2.default.model('exportTracker', exportTrackerSchema);

exports.default = model;