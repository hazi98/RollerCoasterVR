import {Entity, model, property} from '@loopback/repository';

@model()
export class ToursDet extends Entity {
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


  constructor(data?: Partial<ToursDet>) {
    super(data);
  }
}

export interface ToursDetRelations {
  // describe navigational properties here
}

export type ToursDetWithRelations = ToursDet & ToursDetRelations;
