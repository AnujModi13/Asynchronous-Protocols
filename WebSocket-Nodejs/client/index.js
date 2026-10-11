const WebSocket = require('ws');

// Replace with your server URL (e.g., ws://localhost:8080/ws)
const serverUrl = 'ws://localhost:3000'; 
const ws = new WebSocket(serverUrl);

// 1. Connection opened event
ws.on('open', function open() {
  console.log('⚡ Connected to the WebSocket server!');
  
  // Send a test message to the server
  const greeting = { sender: 'NodeClient', content: 'Hello from Node.js!', type: 'CHAT' };
  ws.send(JSON.stringify(greeting));
});

// 2. Message received event
ws.on('message', function message(data) {
  console.log(`📩 Message received from server: ${data}`);
  
  // If the server sends JSON text, parse it:
  try {
    const parsedData = JSON.parse(data);
    console.log('Parsed content:', parsedData.content);
  } catch (e) {
    // Treat as raw text if not JSON
  }
});

// 3. Connection closed event
ws.on('close', function close() {
  console.log('🔌 Disconnected from the server.');
});

// 4. Error handling event
ws.on('error', function error(err) {
  console.error('❌ WebSocket encountered an error:', err.message);
});
