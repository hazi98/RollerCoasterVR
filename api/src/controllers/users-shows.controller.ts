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
  Shows,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersShowsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/shows', {
    responses: {
      '200': {
        description: 'Array of Users has many Shows',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Shows)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Shows>,
  ): Promise<Shows[]> {
    return this.usersRepository.shows(id).find(filter);
  }

  @post('/users/{id}/shows', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Shows)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shows, {
            title: 'NewShowsInUsers',
            exclude: ['id'],
            optional: ['fk_users']
          }),
        },
      },
    }) shows: Omit<Shows, 'id'>,
  ): Promise<Shows> {
    return this.usersRepository.shows(id).create(shows);
  }

  @patch('/users/{id}/shows', {
    responses: {
      '200': {
        description: 'Users.Shows PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shows, {partial: true}),
        },
      },
    })
    shows: Partial<Shows>,
    @param.query.object('where', getWhereSchemaFor(Shows)) where?: Where<Shows>,
  ): Promise<Count> {
    return this.usersRepository.shows(id).patch(shows, where);
  }

  @del('/users/{id}/shows', {
    responses: {
      '200': {
        description: 'Users.Shows DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Shows)) where?: Where<Shows>,
  ): Promise<Count> {
    return this.usersRepository.shows(id).delete(where);
  }
}
