const http = require('http');

const server = http.createServer((req, res) => {
 res.write('Hello project');
 res.end();
})

server.listen(5000)