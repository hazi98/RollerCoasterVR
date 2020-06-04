import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ParkDet} from '../models';
import {ParkDetRepository} from '../repositories';

export class ParkDetController {
  constructor(
    @repository(ParkDetRepository)
    public parkDetRepository : ParkDetRepository,
  ) {}

  @post('/park-dets', {
    responses: {
      '200': {
        description: 'ParkDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParkDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkDet, {
            title: 'NewParkDet',
            exclude: ['id'],
          }),
        },
      },
    })
    parkDet: Omit<ParkDet, 'id'>,
  ): Promise<ParkDet> {
    return this.parkDetRepository.create(parkDet);
  }

  @get('/park-dets/count', {
    responses: {
      '200': {
        description: 'ParkDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ParkDet) where?: Where<ParkDet>,
  ): Promise<Count> {
    return this.parkDetRepository.count(where);
  }

  @get('/park-dets', {
    responses: {
      '200': {
        description: 'Array of ParkDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ParkDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ParkDet) filter?: Filter<ParkDet>,
  ): Promise<ParkDet[]> {
    return this.parkDetRepository.find(filter);
  }

  @patch('/park-dets', {
    responses: {
      '200': {
        description: 'ParkDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkDet, {partial: true}),
        },
      },
    })
    parkDet: ParkDet,
    @param.where(ParkDet) where?: Where<ParkDet>,
  ): Promise<Count> {
    return this.parkDetRepository.updateAll(parkDet, where);
  }

  @get('/park-dets/{id}', {
    responses: {
      '200': {
        description: 'ParkDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParkDet, {exclude: 'where'}) filter?: FilterExcludingWhere<ParkDet>
  ): Promise<ParkDet> {
    return this.parkDetRepository.findById(id, filter);
  }

  @patch('/park-dets/{id}', {
    responses: {
      '204': {
        description: 'ParkDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkDet, {partial: true}),
        },
      },
    })
    parkDet: ParkDet,
  ): Promise<void> {
    await this.parkDetRepository.updateById(id, parkDet);
  }

  @put('/park-dets/{id}', {
    responses: {
      '204': {
        description: 'ParkDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parkDet: ParkDet,
  ): Promise<void> {
    await this.parkDetRepository.replaceById(id, parkDet);
  }

  @del('/park-dets/{id}', {
    responses: {
      '204': {
        description: 'ParkDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parkDetRepository.deleteById(id);
  }
}
