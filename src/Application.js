const debug = require("../utils/debug")("application");
const http = require("http");
const fs = require("fs");
const path = require("path");
const mimeType = {
	".ico": "image/x-icon",
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".png": "image/png",
	".jpg": "image/jpeg",
	".eot": "aplication/vnd.ms-fontobject",
	".ttf": "aplication/font-sfnt",
};
const _server = http.createServer((req, res) => {
	const ext = path.parse(req.url).ext;
	const publicPath = path.join(__dirname, "../public");
	if (Object.keys(mimeType).includes(ext)) {
		fs.readFile(`${publicPath}${req.url}`, (err, data) => {
			if (err) {
				res.statusCode = 404;
				res.end("Not Found");
			} else {
				res.statusCode = 200;
				res.setHeader("Content-Type", mimeType[ext]);
				res.end(data);
			}
		});
	} else {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");
		const filePath = path.join(__dirname, "../public/index.html");
		fs.readFile(filePath, function (err, data) {
			res.write(data);
			return res.end();
		});
	}
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
