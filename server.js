// Import the built-in HTTP module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

// Specify the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
