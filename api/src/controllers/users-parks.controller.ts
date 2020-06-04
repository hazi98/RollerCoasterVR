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
  Parks,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersParksController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/parks', {
    responses: {
      '200': {
        description: 'Array of Users has many Parks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parks>,
  ): Promise<Parks[]> {
    return this.usersRepository.parks(id).find(filter);
  }

  @post('/users/{id}/parks', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parks, {
            title: 'NewParksInUsers',
            exclude: ['id'],
            optional: ['fk_users']
          }),
        },
      },
    }) parks: Omit<Parks, 'id'>,
  ): Promise<Parks> {
    return this.usersRepository.parks(id).create(parks);
  }

  @patch('/users/{id}/parks', {
    responses: {
      '200': {
        description: 'Users.Parks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parks, {partial: true}),
        },
      },
    })
    parks: Partial<Parks>,
    @param.query.object('where', getWhereSchemaFor(Parks)) where?: Where<Parks>,
  ): Promise<Count> {
    return this.usersRepository.parks(id).patch(parks, where);
  }

  @del('/users/{id}/parks', {
    responses: {
      '200': {
        description: 'Users.Parks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parks)) where?: Where<Parks>,
  ): Promise<Count> {
    return this.usersRepository.parks(id).delete(where);
  }
}
