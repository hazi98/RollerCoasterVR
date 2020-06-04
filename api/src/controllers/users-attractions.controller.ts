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
  Attractions,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersAttractionsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/attractions', {
    responses: {
      '200': {
        description: 'Array of Users has many Attractions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Attractions)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Attractions>,
  ): Promise<Attractions[]> {
    return this.usersRepository.attractions(id).find(filter);
  }

  @post('/users/{id}/attractions', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Attractions)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attractions, {
            title: 'NewAttractionsInUsers',
            exclude: ['id'],
            optional: ['fk_users']
          }),
        },
      },
    }) attractions: Omit<Attractions, 'id'>,
  ): Promise<Attractions> {
    return this.usersRepository.attractions(id).create(attractions);
  }

  @patch('/users/{id}/attractions', {
    responses: {
      '200': {
        description: 'Users.Attractions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attractions, {partial: true}),
        },
      },
    })
    attractions: Partial<Attractions>,
    @param.query.object('where', getWhereSchemaFor(Attractions)) where?: Where<Attractions>,
  ): Promise<Count> {
    return this.usersRepository.attractions(id).patch(attractions, where);
  }

  @del('/users/{id}/attractions', {
    responses: {
      '200': {
        description: 'Users.Attractions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Attractions)) where?: Where<Attractions>,
  ): Promise<Count> {
    return this.usersRepository.attractions(id).delete(where);
  }
}
