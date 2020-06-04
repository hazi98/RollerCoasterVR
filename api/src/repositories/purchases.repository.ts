import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Purchases, PurchasesRelations, Users} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsersRepository} from './users.repository';

export class PurchasesRepository extends DefaultCrudRepository<
  Purchases,
  typeof Purchases.prototype.id,
  PurchasesRelations
> {

  public readonly user_purchases: BelongsToAccessor<Users, typeof Purchases.prototype.id>;

  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Purchases, dataSource);
    this.user_purchases = this.createBelongsToAccessorFor('user_purchases', usersRepositoryGetter,);
    this.registerInclusionResolver('user_purchases', this.user_purchases.inclusionResolver);
  }
}
