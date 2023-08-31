const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const port=process.env.PORT||3000
// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running.\n');
});

// Create a WebSocket server by attaching it to the HTTP server
const wss = new WebSocket.Server({ server, path: '/websocket' });

// Initialize a counter for connected clients
let connectedClients = [];
//https://retry-2s8c.onrender.com/websocket
// Set up an event handler for when a client connects
wss.on("connection", (ws, req) => {
  console.log("Client connected");

  connectedClients.push(ws);

  ws.on("message", (data) => {
    connectedClients.forEach((ws, i) => {
      if (ws.readyState === WebSocket.OPEN)
       {
        ws.send(data);
      } else 
      {
        connectedClients.splice(i, 1);
      }
    });
  });
  
});

// Start the HTTP server on port 3000
server.listen(port, () => {
  console.log(`webSocket server is listening on port ${port}.`);
});

// Print the total number of connected clients every 5 seconds
setInterval(() => {
  console.log(`Total clients connected: ${connectedClients}`);
}, 5000);
