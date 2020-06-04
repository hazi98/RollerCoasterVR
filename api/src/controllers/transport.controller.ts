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
import {Transport} from '../models';
import {TransportRepository} from '../repositories';

export class TransportController {
  constructor(
    @repository(TransportRepository)
    public transportRepository : TransportRepository,
  ) {}

  @post('/transports', {
    responses: {
      '200': {
        description: 'Transport model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transport)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transport, {
            title: 'NewTransport',
            exclude: ['id'],
          }),
        },
      },
    })
    transport: Omit<Transport, 'id'>,
  ): Promise<Transport> {
    return this.transportRepository.create(transport);
  }

  @get('/transports/count', {
    responses: {
      '200': {
        description: 'Transport model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Transport) where?: Where<Transport>,
  ): Promise<Count> {
    return this.transportRepository.count(where);
  }

  @get('/transports', {
    responses: {
      '200': {
        description: 'Array of Transport model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Transport, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Transport) filter?: Filter<Transport>,
  ): Promise<Transport[]> {
    return this.transportRepository.find(filter);
  }

  @patch('/transports', {
    responses: {
      '200': {
        description: 'Transport PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transport, {partial: true}),
        },
      },
    })
    transport: Transport,
    @param.where(Transport) where?: Where<Transport>,
  ): Promise<Count> {
    return this.transportRepository.updateAll(transport, where);
  }

  @get('/transports/{id}', {
    responses: {
      '200': {
        description: 'Transport model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Transport, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Transport, {exclude: 'where'}) filter?: FilterExcludingWhere<Transport>
  ): Promise<Transport> {
    return this.transportRepository.findById(id, filter);
  }

  @patch('/transports/{id}', {
    responses: {
      '204': {
        description: 'Transport PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transport, {partial: true}),
        },
      },
    })
    transport: Transport,
  ): Promise<void> {
    await this.transportRepository.updateById(id, transport);
  }

  @put('/transports/{id}', {
    responses: {
      '204': {
        description: 'Transport PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transport: Transport,
  ): Promise<void> {
    await this.transportRepository.replaceById(id, transport);
  }

  @del('/transports/{id}', {
    responses: {
      '204': {
        description: 'Transport DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transportRepository.deleteById(id);
  }
}
