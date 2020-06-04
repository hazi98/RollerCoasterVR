import {DefaultCrudRepository} from '@loopback/repository';
import {Attractions, AttractionsRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AttractionsRepository extends DefaultCrudRepository<
  Attractions,
  typeof Attractions.prototype.id,
  AttractionsRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(Attractions, dataSource);
  }
}
