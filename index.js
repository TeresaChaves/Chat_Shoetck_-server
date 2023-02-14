import express from 'express'
import chat from "./controllers/chat"
import cors from "cors";

require('dotenv').config()



// const app = express();
// const http = require("http").createServer(app);

const app = express();
app.use(express.json({ extended: false }));
app.use(express.static('public'));


// socket io
const io = require("socket.io")(http, {
    path: "/socket.io",
    cors: {
        origin: [process.env.DOMAIN],
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    },
})

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));



app.get("/api", (req, res) => {
    res.send("THIS IS REST API!");
});

chat(io);

const port = process.env.PORT || 8000;
http.listen(port, () => console.log(`Server running on port ${port}`));





