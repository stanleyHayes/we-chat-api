const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const useragent = require("express-useragent");
const Chatroom = require("./models/chatroom");

dotenv.config({path: "./config/config.env"});
const app = express();

mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    (error) => {
        if (error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Connected to mongodb`);
        }
    });

app.get('/', (req, res) => {
    res.send('Server connected on port 8000');
});

app.use(cors());
app.use(helmet());
app.use(useragent.express());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/auth', require("./routes/authentication"));

const server = http.createServer(app);
const PORT = 5000 || process.env.PORT;
const io = socketio(server);

io.use((socket, next) => {
    // console.log(socket.handshake.query);
    next();
})

io.on("connection", async socket => {
    // console.log(`${socket.id} connected`);

    const userChatRooms = await Chatroom.find({"member.user": socket.user});

    socket.on('JOIN_ROOM', ({token, currentUser, roomId}, callback) => {
        socket.join(roomId);
        io.to(roomId).emit('ROOM_MESSAGES', [1, 2, 3, 4, 5]);
        callback();
    });

    socket.on('NEW_MESSAGE', ({message, currentUser, room}, callback) => {
        io.to(room).emit('NEW_MESSAGE_TO_CLIENT', {text: message, sender: currentUser, chatRoom: room});
        callback();
    });
    socket.on("disconnect", () => {
        // console.log(`${socket.id} disconnected`);
    });

    socket.on('LEAVE_ROOM', ({currentUser}, callback) => {
        console.log(`${currentUser.name} has left the room`)
        callback();
    })
});

server.listen(PORT, () => {
    console.log(`Server running in dev mode on port ${PORT}`);
});
