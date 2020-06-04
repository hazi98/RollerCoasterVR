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
import {Tours} from '../models';
import {ToursRepository} from '../repositories';

export class ToursController {
  constructor(
    @repository(ToursRepository)
    public toursRepository : ToursRepository,
  ) {}

  @post('/tours', {
    responses: {
      '200': {
        description: 'Tours model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tours)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tours, {
            title: 'NewTours',
            exclude: ['id'],
          }),
        },
      },
    })
    tours: Omit<Tours, 'id'>,
  ): Promise<Tours> {
    return this.toursRepository.create(tours);
  }

  @get('/tours/count', {
    responses: {
      '200': {
        description: 'Tours model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Tours) where?: Where<Tours>,
  ): Promise<Count> {
    return this.toursRepository.count(where);
  }

  @get('/tours', {
    responses: {
      '200': {
        description: 'Array of Tours model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tours, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Tours) filter?: Filter<Tours>,
  ): Promise<Tours[]> {
    return this.toursRepository.find(filter);
  }

  @patch('/tours', {
    responses: {
      '200': {
        description: 'Tours PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tours, {partial: true}),
        },
      },
    })
    tours: Tours,
    @param.where(Tours) where?: Where<Tours>,
  ): Promise<Count> {
    return this.toursRepository.updateAll(tours, where);
  }

  @get('/tours/{id}', {
    responses: {
      '200': {
        description: 'Tours model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tours, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tours, {exclude: 'where'}) filter?: FilterExcludingWhere<Tours>
  ): Promise<Tours> {
    return this.toursRepository.findById(id, filter);
  }

  @patch('/tours/{id}', {
    responses: {
      '204': {
        description: 'Tours PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tours, {partial: true}),
        },
      },
    })
    tours: Tours,
  ): Promise<void> {
    await this.toursRepository.updateById(id, tours);
  }

  @put('/tours/{id}', {
    responses: {
      '204': {
        description: 'Tours PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tours: Tours,
  ): Promise<void> {
    await this.toursRepository.replaceById(id, tours);
  }

  @del('/tours/{id}', {
    responses: {
      '204': {
        description: 'Tours DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.toursRepository.deleteById(id);
  }
}
