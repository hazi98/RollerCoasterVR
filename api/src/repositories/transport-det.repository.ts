import {DefaultCrudRepository} from '@loopback/repository';
import {TransportDet, TransportDetRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TransportDetRepository extends DefaultCrudRepository<
  TransportDet,
  typeof TransportDet.prototype.id,
  TransportDetRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(TransportDet, dataSource);
  }
}
