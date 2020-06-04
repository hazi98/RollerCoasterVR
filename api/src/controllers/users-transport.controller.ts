import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Transport,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersTransportController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/transports', {
    responses: {
      '200': {
        description: 'Array of Users has many Transport',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transport)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Transport>,
  ): Promise<Transport[]> {
    return this.usersRepository.transports(id).find(filter);
  }

  @post('/users/{id}/transports', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transport)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transport, {
            title: 'NewTransportInUsers',
            exclude: ['id'],
            optional: ['fk_users']
          }),
        },
      },
    }) transport: Omit<Transport, 'id'>,
  ): Promise<Transport> {
    return this.usersRepository.transports(id).create(transport);
  }

  @patch('/users/{id}/transports', {
    responses: {
      '200': {
        description: 'Users.Transport PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transport, {partial: true}),
        },
      },
    })
    transport: Partial<Transport>,
    @param.query.object('where', getWhereSchemaFor(Transport)) where?: Where<Transport>,
  ): Promise<Count> {
    return this.usersRepository.transports(id).patch(transport, where);
  }

  @del('/users/{id}/transports', {
    responses: {
      '200': {
        description: 'Users.Transport DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Transport)) where?: Where<Transport>,
  ): Promise<Count> {
    return this.usersRepository.transports(id).delete(where);
  }
}
