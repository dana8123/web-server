const debug = require("../utils/debug")("application");
const fs = require("fs");
const http = require("http");
const path = require("path");
const serveStatic = require("../src/serve-static");

const _server = http.createServer((req, res) => {
	serveStatic(req, res);

	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	const filePath = path.join(__dirname, "../public/index.html");
	fs.readFile(filePath, function (err, data) {
		if (err) throw err;
		return res.end(data);
	});
});

const Application = () => {
	const listen = (port = 3000, hostname = "127.0.0.1", fn) => {
		_server.listen(port, hostname, fn);
		debug("server is listening");
	};
	return {
		_server,
		listen,
	};
};
module.exports = Application;
