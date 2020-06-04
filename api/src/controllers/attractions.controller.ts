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
import {Attractions} from '../models';
import {AttractionsRepository} from '../repositories';

export class AttractionsController {
  constructor(
    @repository(AttractionsRepository)
    public attractionsRepository : AttractionsRepository,
  ) {}

  @post('/attractions', {
    responses: {
      '200': {
        description: 'Attractions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Attractions)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attractions, {
            title: 'NewAttractions',
            exclude: ['id'],
          }),
        },
      },
    })
    attractions: Omit<Attractions, 'id'>,
  ): Promise<Attractions> {
    return this.attractionsRepository.create(attractions);
  }

  @get('/attractions/count', {
    responses: {
      '200': {
        description: 'Attractions model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Attractions) where?: Where<Attractions>,
  ): Promise<Count> {
    return this.attractionsRepository.count(where);
  }

  @get('/attractions', {
    responses: {
      '200': {
        description: 'Array of Attractions model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Attractions, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Attractions) filter?: Filter<Attractions>,
  ): Promise<Attractions[]> {
    return this.attractionsRepository.find(filter);
  }

  @patch('/attractions', {
    responses: {
      '200': {
        description: 'Attractions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attractions, {partial: true}),
        },
      },
    })
    attractions: Attractions,
    @param.where(Attractions) where?: Where<Attractions>,
  ): Promise<Count> {
    return this.attractionsRepository.updateAll(attractions, where);
  }

  @get('/attractions/{id}', {
    responses: {
      '200': {
        description: 'Attractions model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Attractions, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Attractions, {exclude: 'where'}) filter?: FilterExcludingWhere<Attractions>
  ): Promise<Attractions> {
    return this.attractionsRepository.findById(id, filter);
  }

  @patch('/attractions/{id}', {
    responses: {
      '204': {
        description: 'Attractions PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attractions, {partial: true}),
        },
      },
    })
    attractions: Attractions,
  ): Promise<void> {
    await this.attractionsRepository.updateById(id, attractions);
  }

  @put('/attractions/{id}', {
    responses: {
      '204': {
        description: 'Attractions PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() attractions: Attractions,
  ): Promise<void> {
    await this.attractionsRepository.replaceById(id, attractions);
  }

  @del('/attractions/{id}', {
    responses: {
      '204': {
        description: 'Attractions DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.attractionsRepository.deleteById(id);
  }
}
