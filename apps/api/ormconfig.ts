import * as path from 'path';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

// TypeORMの共通設定（ts-node実行で .ts を参照）
const baseDir = __dirname; // apps/api
const databaseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: path.join(process.cwd(), 'data/dev.sqlite'),
  entities: [path.join(baseDir, 'src/entities/**/*.entity.ts')],
  migrations: [path.join(baseDir, 'src/migrations/**/*.ts')],
  logging: true,
};

const dataSource = new DataSource(databaseConfig);

export default dataSource;
