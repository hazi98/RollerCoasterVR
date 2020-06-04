import {Entity, model, property} from '@loopback/repository';

@model()
export class AttractionsDet extends Entity {
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
  attraction: string;

  @property({
    type: 'number',
    required: true,
  })
  park_id: number;


  constructor(data?: Partial<AttractionsDet>) {
    super(data);
  }
}

export interface AttractionsDetRelations {
  // describe navigational properties here
}

export type AttractionsDetWithRelations = AttractionsDet & AttractionsDetRelations;
