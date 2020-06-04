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
  Purchases,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersPurchasesController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/purchases', {
    responses: {
      '200': {
        description: 'Array of Users has many Purchases',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Purchases)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Purchases>,
  ): Promise<Purchases[]> {
    return this.usersRepository.purchases(id).find(filter);
  }

  @post('/users/{id}/purchases', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Purchases)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchases, {
            title: 'NewPurchasesInUsers',
            exclude: ['id'],
            optional: ['fk_users']
          }),
        },
      },
    }) purchases: Omit<Purchases, 'id'>,
  ): Promise<Purchases> {
    return this.usersRepository.purchases(id).create(purchases);
  }

  @patch('/users/{id}/purchases', {
    responses: {
      '200': {
        description: 'Users.Purchases PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchases, {partial: true}),
        },
      },
    })
    purchases: Partial<Purchases>,
    @param.query.object('where', getWhereSchemaFor(Purchases)) where?: Where<Purchases>,
  ): Promise<Count> {
    return this.usersRepository.purchases(id).patch(purchases, where);
  }

  @del('/users/{id}/purchases', {
    responses: {
      '200': {
        description: 'Users.Purchases DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Purchases)) where?: Where<Purchases>,
  ): Promise<Count> {
    return this.usersRepository.purchases(id).delete(where);
  }
}
