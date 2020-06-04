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
  Tours,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersToursController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/tours', {
    responses: {
      '200': {
        description: 'Array of Users has many Tours',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tours)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tours>,
  ): Promise<Tours[]> {
    return this.usersRepository.tours(id).find(filter);
  }

  @post('/users/{id}/tours', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tours)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tours, {
            title: 'NewToursInUsers',
            exclude: ['id'],
            optional: ['fk_users']
          }),
        },
      },
    }) tours: Omit<Tours, 'id'>,
  ): Promise<Tours> {
    return this.usersRepository.tours(id).create(tours);
  }

  @patch('/users/{id}/tours', {
    responses: {
      '200': {
        description: 'Users.Tours PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tours, {partial: true}),
        },
      },
    })
    tours: Partial<Tours>,
    @param.query.object('where', getWhereSchemaFor(Tours)) where?: Where<Tours>,
  ): Promise<Count> {
    return this.usersRepository.tours(id).patch(tours, where);
  }

  @del('/users/{id}/tours', {
    responses: {
      '200': {
        description: 'Users.Tours DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tours)) where?: Where<Tours>,
  ): Promise<Count> {
    return this.usersRepository.tours(id).delete(where);
  }
}
