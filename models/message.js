const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: [true, "name field required"],
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['SENT', 'DELIVERED', 'READ'],
        default: 'SENT'
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'message required']
    },
    media: {
        type: Buffer
    },
    chatRoom: {
        type: Schema.Types.ObjectId,
        ref: "Chatroom",
        required: [true, 'chatroom required']
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;