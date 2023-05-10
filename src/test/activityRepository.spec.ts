import { prismaMock } from './mock/singleton';
import type { Activity } from '@prisma/client';
import ActivityRepository from '../database/repositories/activityRepository';

const mockRepository = new ActivityRepository(prismaMock);

const expectedSingle: Activity = {
	id: 1,
	name: 'Test Activity 1',
	createdAt: new Date('2021-01-01T00:00:00.000Z'),
	updatedAt: new Date('2021-01-01T00:00:00.000Z'),
	isActive: false,
	icon: 'test-icon',
	createdBy: 1,
};

const expectedMultiple: Activity[] = [
	{
		id: 1,
		name: 'Test Activity 1',
		createdAt: new Date('2021-01-01T00:00:00.000Z'),
		updatedAt: new Date('2021-01-01T00:00:00.000Z'),
		isActive: true,
		icon: 'test-icon',
		createdBy: 1,
	},
	{
		id: 2,
		name: 'Test Activity 2',
		createdAt: new Date('2021-01-01T00:00:00.000Z'),
		updatedAt: new Date('2021-01-01T00:00:00.000Z'),
		isActive: true,
		icon: 'test-icon',
		createdBy: 1,
	},
	{
		id: 3,
		name: 'Test Activity 3',
		createdAt: new Date('2021-01-01T00:00:00.000Z'),
		updatedAt: new Date('2021-01-01T00:00:00.000Z'),
		isActive: true,
		icon: 'test-icon',
		createdBy: 1,
	},
];

describe('ActivityRepository', () => {
	describe('getActivities', () => {
		it('should return all activities', async () => {
			prismaMock.activity.findMany.mockResolvedValue(expectedMultiple);

			const result = await mockRepository.getActivities();

			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
		});
	});

	describe('getActivitiesByUserId', () => {
		it('should return all activities created by a user', async () => {
			prismaMock.activity.findMany.mockResolvedValue(expectedMultiple);
			const result = await mockRepository.getActivitiesByUserId({ userId: 1 });
			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.findMany).toHaveBeenCalledWith({ where: { createdBy: 1 } });
		});
	});

	describe('getActiveActivities', () => {
		it('should return all active activities', async () => {
			prismaMock.activity.findMany.mockResolvedValue(expectedMultiple);
			const result = await mockRepository.getActiveActivities();
			expect(result).toEqual(expectedMultiple);
			expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.findMany).toHaveBeenCalledWith({ where: { isActive: true } });
		});
	});

	describe('getActivityById', () => {
		it('should return an activity by id', async () => {
			prismaMock.activity.findUnique.mockResolvedValue(expectedSingle);
			const result = await mockRepository.getActivityById({ id: 1 });
			expect(result).toEqual(expectedSingle);
			expect(prismaMock.activity.findUnique).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
		});
	});

	describe('createActivity', () => {
		it('should create an activity', async () => {
			prismaMock.activity.create.mockResolvedValue(expectedSingle);
			const result = await mockRepository.createActivity({ activity: expectedSingle });
			expect(result).toEqual(expectedSingle);
			expect(prismaMock.activity.create).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.create).toHaveBeenCalledWith({ data: expectedSingle });
		});
	});

	describe('updateActivity', () => {
		it('should update an activity', async () => {
			prismaMock.activity.update.mockResolvedValue(expectedSingle);
			const result = await mockRepository.updateActivity({ id: 1, activity: expectedSingle });
			expect(result).toEqual(expectedSingle);
			expect(prismaMock.activity.update).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.update).toHaveBeenCalledWith({
				where: { id: expectedSingle.id },
				data: expectedSingle,
			});
		});
	});

	describe('softDeleteActivity', () => {
		it('should soft delete an activity', async () => {
			prismaMock.activity.update.mockResolvedValue(expectedSingle);
			await mockRepository.softDeleteActivity({ id: 1 });
			expect(prismaMock.activity.update).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { isActive: false },
			});
		});
	});

	describe('hardDeleteActivity', () => {
		it('should hard delete an activity', async () => {
			await mockRepository.hardDeleteActivity({ id: 1 });
			expect(prismaMock.activity.delete).toHaveBeenCalledTimes(1);
			expect(prismaMock.activity.delete).toHaveBeenCalledWith({ where: { id: 1 } });
		});
	});
});
