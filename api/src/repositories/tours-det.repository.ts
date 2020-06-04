import {DefaultCrudRepository} from '@loopback/repository';
import {ToursDet, ToursDetRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ToursDetRepository extends DefaultCrudRepository<
  ToursDet,
  typeof ToursDet.prototype.id,
  ToursDetRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(ToursDet, dataSource);
  }
}
