const express = require("express");
const dotenv = require("dotenv");
const http = require("http"); 
const { Server } = require("socket.io"); 
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db"); 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
connectDB();

app.use((req, res, next) => {
    req.io = io; 
    next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));


// Socket.io Connection
io.on("connection", (socket) => {
    console.log("New WebSocket connection:", socket.id);

    socket.on("sendMessage", (data) => {
        console.log(`Message received from ${socket.id}:`, data);
        io.emit("receiveMessage", data); 
    });

    socket.on("disconnect", () => {
        console.log("WebSocket disconnected:", socket.id);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
