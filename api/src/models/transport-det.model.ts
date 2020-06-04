import {Entity, model, property} from '@loopback/repository';

@model()
export class TransportDet extends Entity {
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
  capacity: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;


  constructor(data?: Partial<TransportDet>) {
    super(data);
  }
}

export interface TransportDetRelations {
  // describe navigational properties here
}

export type TransportDetWithRelations = TransportDet & TransportDetRelations;
