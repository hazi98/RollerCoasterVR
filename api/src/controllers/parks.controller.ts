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
import {Parks} from '../models';
import {ParksRepository} from '../repositories';

export class ParksController {
  constructor(
    @repository(ParksRepository)
    public parksRepository : ParksRepository,
  ) {}

  @post('/parks', {
    responses: {
      '200': {
        description: 'Parks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parks)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parks, {
            title: 'NewParks',
            exclude: ['id'],
          }),
        },
      },
    })
    parks: Omit<Parks, 'id'>,
  ): Promise<Parks> {
    return this.parksRepository.create(parks);
  }

  @get('/parks/count', {
    responses: {
      '200': {
        description: 'Parks model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Parks) where?: Where<Parks>,
  ): Promise<Count> {
    return this.parksRepository.count(where);
  }

  @get('/parks', {
    responses: {
      '200': {
        description: 'Array of Parks model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Parks, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Parks) filter?: Filter<Parks>,
  ): Promise<Parks[]> {
    return this.parksRepository.find(filter);
  }

  @patch('/parks', {
    responses: {
      '200': {
        description: 'Parks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parks, {partial: true}),
        },
      },
    })
    parks: Parks,
    @param.where(Parks) where?: Where<Parks>,
  ): Promise<Count> {
    return this.parksRepository.updateAll(parks, where);
  }

  @get('/parks/{id}', {
    responses: {
      '200': {
        description: 'Parks model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parks, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parks, {exclude: 'where'}) filter?: FilterExcludingWhere<Parks>
  ): Promise<Parks> {
    return this.parksRepository.findById(id, filter);
  }

  @patch('/parks/{id}', {
    responses: {
      '204': {
        description: 'Parks PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parks, {partial: true}),
        },
      },
    })
    parks: Parks,
  ): Promise<void> {
    await this.parksRepository.updateById(id, parks);
  }

  @put('/parks/{id}', {
    responses: {
      '204': {
        description: 'Parks PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parks: Parks,
  ): Promise<void> {
    await this.parksRepository.replaceById(id, parks);
  }

  @del('/parks/{id}', {
    responses: {
      '204': {
        description: 'Parks DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parksRepository.deleteById(id);
  }
}
