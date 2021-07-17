const app = require("./app");
const debug = require("./utils/debug")("bin");
const hostname = "127.0.0.1";
const port = 3000;
// run server
app.listen(port, hostname, () => {
	debug(`Server running at http://${hostname}:${port}`);
});
