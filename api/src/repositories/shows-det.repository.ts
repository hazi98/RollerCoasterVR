import {DefaultCrudRepository} from '@loopback/repository';
import {ShowsDet, ShowsDetRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ShowsDetRepository extends DefaultCrudRepository<
  ShowsDet,
  typeof ShowsDet.prototype.id,
  ShowsDetRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(ShowsDet, dataSource);
  }
}
