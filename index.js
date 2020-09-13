const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

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

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const server = http.createServer(app);
const PORT = 5000 || process.env.PORT;
const io = socketio(server);


io.on("connection", socket => {
    socket.on("connect", () => {
        console.log(`${socket.id} connected`);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running in dev mode on port ${PORT}`);
});
