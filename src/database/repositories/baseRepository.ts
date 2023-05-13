import type { TBaseRepository, TDelegate } from './baseRepository.d';

export default abstract class BaseRepository<T = TDelegate> implements TBaseRepository<T> {
	readonly delegate: T;

	constructor(delegate: T) {
		this.delegate = delegate;
	}
}
