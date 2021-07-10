const http = require("http");
const todos = require("./data");
const Todo = require("./todoController");
const { getPostData } = require("./utils");

const server = http.createServer(async (req, res) => {
	// 전체 리스트 확인하기
	if (req.url === "/api/todos" && req.method === "GET") {
		const todos = await Todo.findAll();
		// http response header
		res.writeHead(200, { "Content-Type": "application/json" });
		// http response
		res.end(JSON.stringify(todos));
	} else if (req.url === "/" && req.method === "GET") {
		// end, write뭔차이..
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end("<h1>hello</h1>");
		// 특정 todo 읽기
	} else if (
		req.url.match(/\/api\/todos\/([a-zA-Z0-9]+)/) &&
		req.method === "GET"
	) {
		try {
			const id = req.url.split("/")[3];
			const todo = await Todo.findById(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(todo));
		} catch (error) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "TOdo not found!" }));
		}
		// todo 삭제하기, 인자는 url에 입력된 파라미터로 한다.
	} else if (
		req.url.match(/\/api\/todos\/([a-zA-Z0-9]+)/) &&
		req.method === "DELETE"
	) {
		try {
			const id = req.url.split("/")[3];
			await Todo.deleteById(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Todo deleted successfully!" }));
		} catch (error) {
			console.log(error);
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Todo not found!" }));
		}
		//todos 추가하기
	} else if (req.url == "/api/todos" && req.method === "POST") {
		const body = await getPostData(req); // body는 getPostData에서 받아오는 값으로 처리
		const { title, description } = JSON.parse(body);
		const newTodo = await Todo.create({ title, description });
		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify(newTodo));
		// 수정하기
	} else if (
		req.url.match(/\/api\/todos\/([a-zA-Z0-9]+)/) &&
		req.method === "PATCH"
	) {
		try {
			const body = await getPostData(req);
			const id = req.url.split("3")[3];
			const updateTodo = await Todo.updateById(id, JSON.parse(body));
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(updateTodo));
		} catch (error) {
			console.log(error);
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Todo not found!" }));
		}
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found!" }));
	}
});
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));
