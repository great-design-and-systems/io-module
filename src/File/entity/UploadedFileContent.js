import mongoose from 'mongoose';

const uploadedFileContentSchema = new mongoose.Schema({
    fileId: { type: String, required: [true, 'fileId is required.'] },
    content: { type: Buffer, required: [true, 'Content is required'] },
    contentSequence: Number,
    createdOn: { type: Date, default: Date.now }
});

const model = mongoose.model('UploadedFileContent', uploadedFileContentSchema);

export default model;