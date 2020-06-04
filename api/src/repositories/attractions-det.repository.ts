import {DefaultCrudRepository} from '@loopback/repository';
import {AttractionsDet, AttractionsDetRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AttractionsDetRepository extends DefaultCrudRepository<
  AttractionsDet,
  typeof AttractionsDet.prototype.id,
  AttractionsDetRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(AttractionsDet, dataSource);
  }
}
