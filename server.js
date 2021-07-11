const http = require("http");
// server CREATE
const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello world\n");
});

module.exports = server;
