import mongoose from "mongoose";

const EmailSchema = mongoose.Schema ({
    From: String,
    to: String,
    title: String,
    msgContent: String,
    Date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Emails', EmailSchema)