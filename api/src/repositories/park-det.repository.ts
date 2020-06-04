import {DefaultCrudRepository} from '@loopback/repository';
import {ParkDet, ParkDetRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParkDetRepository extends DefaultCrudRepository<
  ParkDet,
  typeof ParkDet.prototype.id,
  ParkDetRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(ParkDet, dataSource);
  }
}
