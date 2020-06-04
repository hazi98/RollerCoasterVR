import {Entity, model, property} from '@loopback/repository';

@model()
export class ParkDet extends Entity {
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
  park: string;


  constructor(data?: Partial<ParkDet>) {
    super(data);
  }
}

export interface ParkDetRelations {
  // describe navigational properties here
}

export type ParkDetWithRelations = ParkDet & ParkDetRelations;
