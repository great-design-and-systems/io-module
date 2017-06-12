'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImportTrackerSchema = new _mongoose2.default.Schema({
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
    errorCount: {
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
    dataFor: {
        type: String,
        required: [true, 'Data for is required']
    },
    fileId: {
        type: String,
        required: [true, 'File id is required']
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = _mongoose2.default.model('ImportTracker', ImportTrackerSchema);