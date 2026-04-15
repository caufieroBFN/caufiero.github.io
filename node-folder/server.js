// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");

const server = http.createServer((req, res) => {
  let filePath;

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else if (req.url === "/chat.js") {
    filePath = path.join(__dirname, "chat.js");
  } else if (req.url === "/test1.css") {
    filePath = path.join(__dirname, "test1.css");
  } else {
    res.writeHead(404);
    return res.end("Not Found");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading file");
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css"
    };

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain"
    });
    res.end(data);
  });
});

// Attach Socket.IO
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

