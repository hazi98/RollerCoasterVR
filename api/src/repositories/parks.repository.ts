import {DefaultCrudRepository} from '@loopback/repository';
import {Parks, ParksRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParksRepository extends DefaultCrudRepository<
  Parks,
  typeof Parks.prototype.id,
  ParksRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(Parks, dataSource);
  }
}
