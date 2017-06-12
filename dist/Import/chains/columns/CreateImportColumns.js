'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../../entity/');

var _Chain2 = require('../util/Chain.info');

var Action = function Action(context, param, next) {
    _entity.Columns.create({
        importId: param.importId(),
        columns: param.columns()
    }, function (err, columns) {
        context.set('columns', columns);
        next(err);
    });
};

var CreateImportColumns = new _fluidChains.Chain(_Chain.CREATE_IMPORT_COLUMNS, Action, undefined, _Chain2.IMPORT_ERROR_HANDLER);
CreateImportColumns.addSpec('importId', true);
CreateImportColumns.addSpec('column', true);