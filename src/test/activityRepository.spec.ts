import { prismaMock } from './mock/singleton';
import ActivityRepository from '../database/repositories/activityRepository';

const mockRepository = new ActivityRepository(prismaMock);

describe('ActivityRepository', () => {
	describe('getActivities', () => {
		it('should return all activities', async () => {
			const expected = [
				{
					id: 1,
					name: 'Test Activity 1',
					description: 'Test Description 1',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
				{
					id: 2,
					name: 'Test Activity 2',
					description: 'Test Description 2',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
				{
					id: 3,
					name: 'Test Activity 3',
					description: 'Test Description 3',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
			];

			prismaMock.activity.findMany.mockResolvedValue(expected);

			const result = await mockRepository.getActivities();

			expect(result).toEqual(expected);
			expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getActivitiesByUserId', () => {
		it('should return all activities created by a user', async () => {
			const expected = [
				{
					id: 1,
					name: 'Test Activity 1',
					description: 'Test Description 1',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
				{
					id: 2,
					name: 'Test Activity 2',
					description: 'Test Description 2',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
				{
					id: 3,
					name: 'Test Activity 3',
					description: 'Test Description 3',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
			];

			prismaMock.activity.findMany.mockResolvedValue(expected);
			const result = await mockRepository.getActivitiesByUserId(1);
			expect(result).toEqual(expected);
			expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.findMany).toHaveBeenCalledWith({ where: { createdBy: 1 } });
		});
	});

	describe('getActiveActivities', () => {
		it('should return all active activities', async () => {
			const expected = [
				{
					id: 1,
					name: 'Test Activity 1',
					description: 'Test Description 1',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
				{
					id: 2,
					name: 'Test Activity 2',
					description: 'Test Description 2',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
				{
					id: 3,
					name: 'Test Activity 3',
					description: 'Test Description 3',
					createdAt: new Date('2021-01-01T00:00:00.000Z'),
					updatedAt: new Date('2021-01-01T00:00:00.000Z'),
					isActive: true,
					icon: 'test-icon',
					createdBy: 1,
				},
			];

			prismaMock.activity.findMany.mockResolvedValue(expected);
			const result = await mockRepository.getActiveActivities();
			expect(result).toEqual(expected);
			expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.findMany).toHaveBeenCalledWith({ where: { isActive: true } });
		});
	});

	describe('getActivityById', () => {
		it('should return an activity by id', async () => {
			const expected = {
				id: 1,
				name: 'Test Activity 1',
				description: 'Test Description 1',
				createdAt: new Date('2021-01-01T00:00:00.000Z'),
				updatedAt: new Date('2021-01-01T00:00:00.000Z'),
				isActive: true,
				icon: 'test-icon',
				createdBy: 1,
			};

			prismaMock.activity.findUnique.mockResolvedValue(expected);
			const result = await mockRepository.getActivityById(1);
			expect(result).toEqual(expected);
			expect(prismaMock.activity.findUnique).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
		});
	});

	describe('createActivity', () => {
		it('should create an activity', async () => {
			const expected = {
				id: 1,
				name: 'Test Activity 1',
				description: 'Test Description 1',
				createdAt: new Date('2021-01-01T00:00:00.000Z'),
				updatedAt: new Date('2021-01-01T00:00:00.000Z'),
				isActive: true,
				icon: 'test-icon',
				createdBy: 1,
			};

			prismaMock.activity.create.mockResolvedValue(expected);
			const result = await mockRepository.createActivity(expected);
			expect(result).toEqual(expected);
			expect(prismaMock.activity.create).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.create).toHaveBeenCalledWith({ data: expected });
		});
	});

	describe('updateActivity', () => {
		it('should update an activity', async () => {
			const expected = {
				id: 1,
				name: 'Test Activity 1',
				description: 'Test Description 1',
				createdAt: new Date('2021-01-01T00:00:00.000Z'),
				updatedAt: new Date('2021-01-01T00:00:00.000Z'),
				isActive: true,
				icon: 'test-icon',
				createdBy: 1,
			};

			prismaMock.activity.update.mockResolvedValue(expected);
			const result = await mockRepository.updateActivity(expected);
			expect(result).toEqual(expected);
			expect(prismaMock.activity.update).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.update).toHaveBeenCalledWith({
				where: { id: expected.id },
				data: expected,
			});
		});
	});

	describe('softDeleteActivity', () => {
		it('should soft delete an activity', async () => {
			const expected = {
				id: 1,
				name: 'Test Activity 1',
				description: 'Test Description 1',
				createdAt: new Date('2021-01-01T00:00:00.000Z'),
				updatedAt: new Date('2021-01-01T00:00:00.000Z'),
				isActive: false,
				icon: 'test-icon',
				createdBy: 1,
			};

			prismaMock.activity.update.mockResolvedValue(expected);
			await mockRepository.softDeleteActivity(1);
			expect(prismaMock.activity.update).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { isActive: false },
			});
		});
	});

	describe('hardDeleteActivity', () => {
		it('should hard delete an activity', async () => {
			await mockRepository.hardDeleteActivity(1);
			expect(prismaMock.activity.delete).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.delete).toHaveBeenCalledWith({ where: { id: 1 } });
		});
	});
});
