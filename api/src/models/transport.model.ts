import {Entity, model, property} from '@loopback/repository';

@model()
export class Transport extends Entity {
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
  transport: string;

  @property({
    type: 'date',
    required: true,
  })
  departure: string;

  @property({
    type: 'date',
    required: true,
  })
  arrival: string;

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


  constructor(data?: Partial<Transport>) {
    super(data);
  }
}

export interface TransportRelations {
  // describe navigational properties here
}

export type TransportWithRelations = Transport & TransportRelations;
