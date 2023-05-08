import Database from '../database/database';
import { prismaMock } from './mock/singleton';

const mockDatabase = new Database(prismaMock);

describe('Database', () => {
	test('should return the singleton instance', () => {
		expect(Database.sharedInstance).toBeInstanceOf(Database);
	});

	test('should return the default client', () => {
		expect(mockDatabase.getDefaultClient()).toBe(prismaMock);
	});

	test('should initialize the database', async () => {
		await mockDatabase.initialize();
		expect(prismaMock.$connect).toHaveBeenCalled();
	});
});
