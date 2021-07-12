const { listen } = require("./app");
const app = require("./app");
const hostname = "127.0.0.1";
const port = 3000;
// run server
app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});
