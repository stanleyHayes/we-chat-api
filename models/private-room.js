const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const privateRoomSchema = new Schema({
    members: {
        type: [
            {
                user: {
                    type: [Schema.Types.ObjectId],
                    ref: "User"
                }
            }
        ]
    },
    roomID:{
        type: String,
        required: [true, 'Room required']
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    }
}, {timestamps: true});

const GroupRoom = mongoose.model("Private", privateRoomSchema);

module.exports = GroupRoom;