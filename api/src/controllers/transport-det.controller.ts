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
import {TransportDet} from '../models';
import {TransportDetRepository} from '../repositories';

export class TransportDetController {
  constructor(
    @repository(TransportDetRepository)
    public transportDetRepository : TransportDetRepository,
  ) {}

  @post('/transport-dets', {
    responses: {
      '200': {
        description: 'TransportDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(TransportDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransportDet, {
            title: 'NewTransportDet',
            exclude: ['id'],
          }),
        },
      },
    })
    transportDet: Omit<TransportDet, 'id'>,
  ): Promise<TransportDet> {
    return this.transportDetRepository.create(transportDet);
  }

  @get('/transport-dets/count', {
    responses: {
      '200': {
        description: 'TransportDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TransportDet) where?: Where<TransportDet>,
  ): Promise<Count> {
    return this.transportDetRepository.count(where);
  }

  @get('/transport-dets', {
    responses: {
      '200': {
        description: 'Array of TransportDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TransportDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TransportDet) filter?: Filter<TransportDet>,
  ): Promise<TransportDet[]> {
    return this.transportDetRepository.find(filter);
  }

  @patch('/transport-dets', {
    responses: {
      '200': {
        description: 'TransportDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransportDet, {partial: true}),
        },
      },
    })
    transportDet: TransportDet,
    @param.where(TransportDet) where?: Where<TransportDet>,
  ): Promise<Count> {
    return this.transportDetRepository.updateAll(transportDet, where);
  }

  @get('/transport-dets/{id}', {
    responses: {
      '200': {
        description: 'TransportDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TransportDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TransportDet, {exclude: 'where'}) filter?: FilterExcludingWhere<TransportDet>
  ): Promise<TransportDet> {
    return this.transportDetRepository.findById(id, filter);
  }

  @patch('/transport-dets/{id}', {
    responses: {
      '204': {
        description: 'TransportDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransportDet, {partial: true}),
        },
      },
    })
    transportDet: TransportDet,
  ): Promise<void> {
    await this.transportDetRepository.updateById(id, transportDet);
  }

  @put('/transport-dets/{id}', {
    responses: {
      '204': {
        description: 'TransportDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transportDet: TransportDet,
  ): Promise<void> {
    await this.transportDetRepository.replaceById(id, transportDet);
  }

  @del('/transport-dets/{id}', {
    responses: {
      '204': {
        description: 'TransportDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transportDetRepository.deleteById(id);
  }
}
