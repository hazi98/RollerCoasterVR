import {Entity, model, property} from '@loopback/repository';

@model()
export class Tours extends Entity {
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
  destination: string;

  @property({
    type: 'date',
    required: true,
  })
  day: string;

  @property({
    type: 'string',
    required: true,
  })
  departure: string;

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

  constructor(data?: Partial<Tours>) {
    super(data);
  }
}

export interface ToursRelations {
  // describe navigational properties here
}

export type ToursWithRelations = Tours & ToursRelations;
