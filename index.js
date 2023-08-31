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
let clientCount = 0;

// Set up an event handler for when a client connects
wss.on('connection', (ws) => {
  // Increment the client count
  clientCount++;

  // Send a welcome message to the client
  ws.send('Hi! Welcome to the WebSocket server.');

  // Set up an event handler for when a message is received from the client
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Set up an event handler for when a client disconnects
  ws.on('close', () => {
    // Decrement the client count
    clientCount--;
  });
});

// Start the HTTP server on port 3000
server.listen(port, () => {
  console.log(`webSocket server is listening on port ${port}.`);
});

// Print the total number of connected clients every 5 seconds
setInterval(() => {
  console.log(`Total clients connected: ${clientCount}`);
}, 5000);
