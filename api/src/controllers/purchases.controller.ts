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
import {Purchases} from '../models';
import {PurchasesRepository} from '../repositories';

export class PurchasesController {
  constructor(
    @repository(PurchasesRepository)
    public purchasesRepository : PurchasesRepository,
  ) {}

  @post('/purchases', {
    responses: {
      '200': {
        description: 'Purchases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Purchases)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchases, {
            title: 'NewPurchases',
            exclude: ['id'],
          }),
        },
      },
    })
    purchases: Omit<Purchases, 'id'>,
  ): Promise<Purchases> {
    return this.purchasesRepository.create(purchases);
  }

  @get('/purchases/count', {
    responses: {
      '200': {
        description: 'Purchases model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Purchases) where?: Where<Purchases>,
  ): Promise<Count> {
    return this.purchasesRepository.count(where);
  }

  @get('/purchases', {
    responses: {
      '200': {
        description: 'Array of Purchases model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Purchases, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Purchases) filter?: Filter<Purchases>,
  ): Promise<Purchases[]> {
    return this.purchasesRepository.find(filter);
  }

  @patch('/purchases', {
    responses: {
      '200': {
        description: 'Purchases PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchases, {partial: true}),
        },
      },
    })
    purchases: Purchases,
    @param.where(Purchases) where?: Where<Purchases>,
  ): Promise<Count> {
    return this.purchasesRepository.updateAll(purchases, where);
  }

  @get('/purchases/{id}', {
    responses: {
      '200': {
        description: 'Purchases model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Purchases, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Purchases, {exclude: 'where'}) filter?: FilterExcludingWhere<Purchases>
  ): Promise<Purchases> {
    return this.purchasesRepository.findById(id, filter);
  }

  @patch('/purchases/{id}', {
    responses: {
      '204': {
        description: 'Purchases PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Purchases, {partial: true}),
        },
      },
    })
    purchases: Purchases,
  ): Promise<void> {
    await this.purchasesRepository.updateById(id, purchases);
  }

  @put('/purchases/{id}', {
    responses: {
      '204': {
        description: 'Purchases PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() purchases: Purchases,
  ): Promise<void> {
    await this.purchasesRepository.replaceById(id, purchases);
  }

  @del('/purchases/{id}', {
    responses: {
      '204': {
        description: 'Purchases DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.purchasesRepository.deleteById(id);
  }
}
