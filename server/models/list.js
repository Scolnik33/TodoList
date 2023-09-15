import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    listItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tasks'
        }
    ]
})

export default mongoose.model('List', ListSchema)