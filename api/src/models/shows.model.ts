import {Entity, model, property} from '@loopback/repository';

@model()
export class Shows extends Entity {
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
  showname: string;

  @property({
    type: 'date',
    required: true,
  })
  day: string;

  @property({
    type: 'string',
    required: true,
  })
  schedule: string;

  @property({
    type: 'number',
  })
  adults?: number;

  @property({
    type: 'number',
  })
  children?: number;

  @property({
    type: 'number',
    required: true,
  })
  fk_users: number;

  constructor(data?: Partial<Shows>) {
    super(data);
  }
}

export interface ShowsRelations {
  // describe navigational properties here
}

export type ShowsWithRelations = Shows & ShowsRelations;
