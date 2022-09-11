import { IRouter } from 'express';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface IComponentRoutes<T> {
	readonly controller: T;
	readonly router: IRouter;

	initRoutes(prefix: string): void;
}

export interface IRepository<T> {
	find(options?: FindManyOptions<T>): Promise<T[]>;
	findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
	findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;
	findOne(options: FindOneOptions<T>): Promise<T | null>;
	findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null>;
	save(entity: T): Promise<T>;
	delete(entity: T): Promise<T>;
}

export abstract class RepositoryBase<T> implements IRepository<T> {
	find(options?: FindManyOptions<T>): Promise<T[]> {
		throw new Error(`Method not implemented (params: ${options}).`);
	}
	findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
		throw new Error(`Method not implemented (params: ${where}).`);
	}
	findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
		throw new Error(`Method not implemented (params: ${options}).`);
	}
	findOne(options: FindOneOptions<T>): Promise<T | null> {
		throw new Error(`Method not implemented (params: ${options}).`);
	}
	findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null> {
		throw new Error(`Method not implemented (params: ${where}).`);
	}
	save(entity: T): Promise<T> {
		throw new Error(`Method not implemented (params: ${entity}).`);
	}
	delete(entity: T): Promise<T> {
		throw new Error(`Method not implemented (params: ${entity}).`);
	}
}
