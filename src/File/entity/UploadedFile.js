import mongoose from 'mongoose';

const uploadedFileScheme = new mongoose.Schema({
    fileName: { type: String, required: [true, 'File name is required'] },
    fileType: { type: String, required: [true, 'File type is required.'] },
    fileSize: { type: Number, required: [true, 'File size is required.'] },
    createdBy: { type: String, required: [true, 'CreatedBy is required.'] },
    updatedBy: String,
    updatedOn: Date,
    createdOn: { type: Date, default: Date.now }
});

const model = mongoose.model('uploadedFile', uploadedFileScheme);

export default model;