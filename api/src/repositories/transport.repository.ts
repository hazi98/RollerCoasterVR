import {DefaultCrudRepository} from '@loopback/repository';
import {Transport, TransportRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TransportRepository extends DefaultCrudRepository<
  Transport,
  typeof Transport.prototype.id,
  TransportRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(Transport, dataSource);
  }
}
