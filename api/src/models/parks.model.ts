import {Entity, model, property} from '@loopback/repository';

@model()
export class Parks extends Entity {
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
    type: 'date',
    required: true,
  })
  check_in: string;

  @property({
    type: 'date',
    required: true,
  })
  check_out: string;

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

  constructor(data?: Partial<Parks>) {
    super(data);
  }
}

export interface ParksRelations {
  // describe navigational properties here
}

export type ParksWithRelations = Parks & ParksRelations;
