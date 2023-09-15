import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tasks'
        }
    ],
    views: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'View'
        }
    ],
    lists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List'
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)