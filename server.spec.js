const should = require("should");
const server = require("./server");

describe("server test suit", () => {
	it("should have listen()", () => {
		server.should.have.property("listen");
		should(typeof server.listen).be.equal("function");
	});
});
