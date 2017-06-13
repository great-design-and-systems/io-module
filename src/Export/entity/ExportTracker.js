import mongoose from 'mongoose';

const exportTrackerSchema = new mongoose.Schema({
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

const model = mongoose.model('exportTracker', exportTrackerSchema);

export default model;