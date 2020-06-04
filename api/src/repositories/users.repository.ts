import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, Purchases, Parks, Attractions, Shows, Tours, Transport} from '../models';
import {MagicsansDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PurchasesRepository} from './purchases.repository';
import {ParksRepository} from './parks.repository';
import {AttractionsRepository} from './attractions.repository';
import {ShowsRepository} from './shows.repository';
import {ToursRepository} from './tours.repository';
import {TransportRepository} from './transport.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly purchases: HasManyRepositoryFactory<Purchases, typeof Users.prototype.id>;

  public readonly parks: HasManyRepositoryFactory<Parks, typeof Users.prototype.id>;

  public readonly attractions: HasManyRepositoryFactory<Attractions, typeof Users.prototype.id>;

  public readonly shows: HasManyRepositoryFactory<Shows, typeof Users.prototype.id>;

  public readonly tours: HasManyRepositoryFactory<Tours, typeof Users.prototype.id>;

  public readonly transports: HasManyRepositoryFactory<Transport, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.magicsans') dataSource: MagicsansDataSource, @repository.getter('PurchasesRepository') protected purchasesRepositoryGetter: Getter<PurchasesRepository>, @repository.getter('ParksRepository') protected parksRepositoryGetter: Getter<ParksRepository>, @repository.getter('AttractionsRepository') protected attractionsRepositoryGetter: Getter<AttractionsRepository>, @repository.getter('ShowsRepository') protected showsRepositoryGetter: Getter<ShowsRepository>, @repository.getter('ToursRepository') protected toursRepositoryGetter: Getter<ToursRepository>, @repository.getter('TransportRepository') protected transportRepositoryGetter: Getter<TransportRepository>,
  ) {
    super(Users, dataSource);
    this.transports = this.createHasManyRepositoryFactoryFor('transports', transportRepositoryGetter,);
    this.registerInclusionResolver('transports', this.transports.inclusionResolver);
    this.tours = this.createHasManyRepositoryFactoryFor('tours', toursRepositoryGetter,);
    this.registerInclusionResolver('tours', this.tours.inclusionResolver);
    this.shows = this.createHasManyRepositoryFactoryFor('shows', showsRepositoryGetter,);
    this.registerInclusionResolver('shows', this.shows.inclusionResolver);
    this.attractions = this.createHasManyRepositoryFactoryFor('attractions', attractionsRepositoryGetter,);
    this.registerInclusionResolver('attractions', this.attractions.inclusionResolver);
    this.parks = this.createHasManyRepositoryFactoryFor('parks', parksRepositoryGetter,);
    this.registerInclusionResolver('parks', this.parks.inclusionResolver);
    this.purchases = this.createHasManyRepositoryFactoryFor('purchases', purchasesRepositoryGetter,);
    this.registerInclusionResolver('purchases', this.purchases.inclusionResolver);
  }
}
