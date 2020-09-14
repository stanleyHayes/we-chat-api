const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    members: {
        type: [
            {
                user: {
                    type: [Schema.Types.ObjectId],
                    ref: "User"
                },
                joinedAt: {
                    type: Date,
                    default: Date.now()
                }
            }
        ]
    },
    type: {
        type: String,
        enum: ['PRIVATE', 'GROUP'],
        default: 'PRIVATE'
    },
    admins: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'group creator required']
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    }
}, {timestamps: true});

const Chatroom = mongoose.model("Chatroom", chatSchema);

module.exports = Chatroom;