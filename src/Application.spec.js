require("should");
const sinon = require("sinon");
//application모듈의 listen()메소드 테스트
const App = require("./Application");
//테스트 꾸러미, 테스트 환경을 기술
describe("Application", () => {
	describe("listen()", () => {
		// 테스트케이스, 단위 테스트 정의
		it("server 객체의 listen 함수를 실행한다.", () => {
			//arrange
			const app = App();
			const spy = sinon.spy();
			app._server.listen = spy;
			//act
			app.listen();
			//assert : listen 메서드의 실행 여부.
			should(spy.called).be.equal(true);
		});
	});
});
