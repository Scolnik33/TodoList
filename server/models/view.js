import mongoose from "mongoose";

const ViewSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    viewItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tasks'
        }
    ]
})

export default mongoose.model('View', ViewSchema)