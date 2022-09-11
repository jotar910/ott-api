import { memoize } from 'decko';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Env } from '../../config/globals';

export class DataSourceService {

    get dataSource(): DataSource {
        return this._dataSource;
    }

    private _dataSource!: DataSource;
    private readonly options: DataSourceOptions;

    private constructor() {
        this.options = {
            type: 'postgres',
            host: Env.all.TYPEORM_HOST,
            port: Env.all.TYPEORM_PORT,
            username: Env.all.TYPEORM_USERNAME,
            password: Env.all.TYPEORM_PASSWORD,
            database: Env.all.TYPEORM_DATABASE,
            entities: Env.all.TYPEORM_ENTITIES,
            synchronize: Env.all.TYPEORM_SYNCHRONIZE,
            logging: Env.all.TYPEORM_LOGGING
        };
    }

    @memoize
    static getInstance(): DataSourceService {
        return new DataSourceService();
    }

    async connect(): Promise<DataSource> {
        return this._dataSource = await new DataSource(this.options).initialize();
    }
}

export const useDataSourceService = DataSourceService.getInstance;
export const useDataSource = () => useDataSourceService().dataSource;