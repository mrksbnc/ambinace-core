import Server from '../server/server';

const mockServer = new Server();

describe('Server', () => {
	it('should return an instance of Server', () => {
		expect(mockServer).toBeInstanceOf(Server);
	});

	it('should return an instance of express.Application', () => {
		expect(mockServer.get()).toBeDefined();
	});
});
