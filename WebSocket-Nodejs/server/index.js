import express from "express";
import {WebSocketServer} from "ws";

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
    });
});