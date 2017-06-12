'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImportLogSchema = new _mongoose2.default.Schema({
    importId: {
        type: String,
        required: [true, 'Import Id is required']
    },
    items: {
        type: Array,
        required: [true, 'Item values are required']
    },
    columns: {
        type: Array,
        required: [true, 'Column values are required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        default: 'NEW',
        enum: ['FAILED', 'SUCCESS']
    },
    progressCount: {
        type: Number,
        default: 0
    },
    updatedOn: Date,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = _mongoose2.default.model('ImportLog', ImportLogSchema);