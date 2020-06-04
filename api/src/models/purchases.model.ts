import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users, UsersWithRelations} from './users.model';
@model()
export class Purchases extends Entity {
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
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  transaction_id: number;

  @property({
    type: 'date',
  })
  created: string;

  @belongsTo(() => Users, {name: 'user_purchases'})
  fk_users: number;

  constructor(data?: Partial<Purchases>) {
    super(data);
  }
}

export interface PurchasesRelations {
  // describe navigational properties here
  users?: UsersWithRelations;
}

export type PurchasesWithRelations = Purchases & PurchasesRelations;
