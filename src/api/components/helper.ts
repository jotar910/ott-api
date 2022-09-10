import { IRouter } from 'express';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface IComponentRoutes<T> {
	readonly controller: T;
	readonly router: IRouter;

	initRoutes(): void;
}

export interface IRepository<T> {
	find(options?: FindManyOptions<T>): Promise<T[]>;
	findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
	findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;
	findOne(options: FindOneOptions<T>): Promise<T>;
	findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>;
	save(entity: T): Promise<T>;
	delete(entity: T): Promise<T>;
}

export abstract class RepositoryBase<T> implements IRepository<T> {
	find(): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	findBy(): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	findAndCount(): Promise<[T[], number]> {
		throw new Error('Method not implemented.');
	}
	findOne(): Promise<T> {
		throw new Error('Method not implemented.');
	}
	findOneBy(): Promise<T> {
		throw new Error('Method not implemented.');
	}
	save(): Promise<T> {
		throw new Error('Method not implemented.');
	}
	delete(): Promise<T> {
		throw new Error('Method not implemented.');
	}
}
