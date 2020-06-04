import {Entity, model, property} from '@loopback/repository';

@model()
export class ShowsDet extends Entity {
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
    type: 'number',
    required: true,
  })
  park_id: number;

  constructor(data?: Partial<ShowsDet>) {
    super(data);
  }
}

export interface ShowsDetRelations {
  // describe navigational properties here
}

export type ShowsDetWithRelations = ShowsDet & ShowsDetRelations;
