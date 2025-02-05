// server.js
const express = require('express');
const next = require('next');
const http = require('http');
const https = require('node:https');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = async (server) => {
    if (process.env.MODE == "https") {
        const options = {
            key: fs.readFileSync(path.resolve(__dirname, "./openssl/server.key")),
            cert: fs.readFileSync(path.resolve(__dirname, "./openssl/server.cert")),
        };
        return https.createServer(options, server);
    } else {
        return http.createServer(server);
    }
};

app.prepare().then(async () => {
    const server = express();

    const httpServer = await createServer(server);
    // Create a server instance
    const io = new Server(httpServer);

    // Socket.IO connection handling
    io.on('connection', (socket) => {
        // Handle incoming messages
        socket.on('message', (payload) => {
            socket.broadcast.emit('message', payload);
        });

        socket.on('disconnect', () => {
            socket.leave(socket.id)
        });
    });

    // Next.js request handling
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start the server
    const PORT = process.env.PORT || 80;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
