import {Entity, model, property, hasMany} from '@loopback/repository';
import {Purchases} from './purchases.model';
import {Parks} from './parks.model';
import {Attractions} from './attractions.model';
import {Shows} from './shows.model';
import {Tours} from './tours.model';
import {Transport} from './transport.model';

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @hasMany(() => Purchases, {keyTo: 'fk_users'})
  purchases: Purchases[];

  @hasMany(() => Parks, {keyTo: 'fk_users'})
  parks: Parks[];

  @hasMany(() => Attractions, {keyTo: 'fk_users'})
  attractions: Attractions[];

  @hasMany(() => Shows, {keyTo: 'fk_users'})
  shows: Shows[];

  @hasMany(() => Tours, {keyTo: 'fk_users'})
  tours: Tours[];

  @hasMany(() => Transport, {keyTo: 'fk_users'})
  transports: Transport[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
