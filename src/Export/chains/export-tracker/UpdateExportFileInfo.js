import { UPDATE_EXPORT_FILE_INFO } from './Chain.info';
import { Chain } from 'fluid-chains';
import { EXPORT_ERROR_HANDLER } from '../util/Chain.info';
import { ExportTracker } from '../../entity/';

const Action = (context, param, next) => {
    ExportTracker.findByIdAndUpdate(param.exportId(),
        { $set: { fileId: param.fileId() } },
        { new: true }, // true to return the modified document rather than the original
        (err, updatedTracker) => {
            context.set('exportTracker', updatedTracker);
            next(err);
        });
}

const UpdateExportFileInfo = new Chain(UPDATE_EXPORT_FILE_INFO,
    Action, undefined, EXPORT_ERROR_HANDLER);
UpdateExportFileInfo.addSpec('exportId', true);
UpdateExportFileInfo.addSpec('fileId', true);