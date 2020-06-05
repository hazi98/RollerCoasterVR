import {Entity, model, property} from '@loopback/repository';

@model()
export class Attractions extends Entity {
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
    type: 'string',
    required: true,
  })
  prueba: string;

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

  constructor(data?: Partial<Attractions>) {
    super(data);
  }
}

export interface AttractionsRelations {
  // describe navigational properties here
}

export type AttractionsWithRelations = Attractions & AttractionsRelations;
