const color = {
	Reset: "\x1b[0m",
	Red: "\x1b[31m",
	Green: "\x1b[32m",
	Yellow: "\x1b[33m",
	Blue: "\x1b[34m",
	Magenta: "\x1b[35m",
};

const funcNames = ["info", "log", "warn", "error"];
const colors = [color.Green, color.Red, color.Yellow, color.Blue];
const debug = (tag) => {
	const randIdx = Math.floor(Math.random() * colors.length) % colors.length;
	const randColor = colors[randIdx];
	if (!tag) throw Error("tag should be required");

	return (msg) => {
		const logString = `${randColor}[${tag}] ${msg}`;
		console.log(logString);
		return logString;
	};
};
module.exports = debug;
