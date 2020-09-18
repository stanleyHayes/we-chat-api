const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    roomID:{
        type: String,
        required: [true, 'Room required']
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
                },
                role: {
                    type: String,
                    enum: ['REGULAR','ADMIN'],
                    default: 'REGULAR'
                }
            }
        ]
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

const GroupRoom = mongoose.model("Group", groupSchema);

module.exports = GroupRoom;