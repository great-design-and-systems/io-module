'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var importColumnsScheme = new _mongoose2.default.Schema({
    importId: {
        type: String,
        required: [true, 'ImportId is required']
    },
    columns: {
        type: Array,
        required: [true, 'columns are required']
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = _mongoose2.default.model('ImportColumns', importColumnsScheme);