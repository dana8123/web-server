function getPostData(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = "";
			// on method binds an event to a object
			// event-driven programming
			req.on("data", (chunk) => {
				body += chunk.toString();
			});
			req.on("end", () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = { getPostData };
