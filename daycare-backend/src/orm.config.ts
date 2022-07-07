import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
      migrationDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
  };

  const _ormConfing: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'post',
    entities: commonConf.ENTITIES, // entity 추가후 넣어주기
    synchronize: commonConf.SYNCRONIZE, // 운영시 사용 금지
    logging: true,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };

  return _ormConfing;
}

export { ormConfig };
