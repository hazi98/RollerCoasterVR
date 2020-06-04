import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'magicsans',
  connector: 'mysql',
  url: 'mysql://usuario:admin@localhost/magicsans',
  host: 'localhost',
  port: 3306,
  user: 'usuario',
  password: 'admin',
  database: 'magicsans',
  timezone: 'America/Mexico_City',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MagicsansDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'magicsans';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.magicsans', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
