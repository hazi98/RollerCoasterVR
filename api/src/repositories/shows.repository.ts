import {DefaultCrudRepository} from '@loopback/repository';
import {Shows, ShowsRelations} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ShowsRepository extends DefaultCrudRepository<
  Shows,
  typeof Shows.prototype.id,
  ShowsRelations
> {
  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource,
  ) {
    super(Shows, dataSource);
  }
}
