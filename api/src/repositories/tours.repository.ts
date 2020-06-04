import {DefaultCrudRepository} from '@loopback/repository';
import {Tours, ToursRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ToursRepository extends DefaultCrudRepository<
  Tours,
  typeof Tours.prototype.id,
  ToursRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(Tours, dataSource);
  }
}
