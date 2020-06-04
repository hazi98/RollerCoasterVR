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
import {AttractionsDet} from '../models';
import {AttractionsDetRepository} from '../repositories';

export class AttractionsDetController {
  constructor(
    @repository(AttractionsDetRepository)
    public attractionsDetRepository : AttractionsDetRepository,
  ) {}

  @post('/attractions-dets', {
    responses: {
      '200': {
        description: 'AttractionsDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(AttractionsDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttractionsDet, {
            title: 'NewAttractionsDet',
            exclude: ['id'],
          }),
        },
      },
    })
    attractionsDet: Omit<AttractionsDet, 'id'>,
  ): Promise<AttractionsDet> {
    return this.attractionsDetRepository.create(attractionsDet);
  }

  @get('/attractions-dets/count', {
    responses: {
      '200': {
        description: 'AttractionsDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AttractionsDet) where?: Where<AttractionsDet>,
  ): Promise<Count> {
    return this.attractionsDetRepository.count(where);
  }

  @get('/attractions-dets', {
    responses: {
      '200': {
        description: 'Array of AttractionsDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AttractionsDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AttractionsDet) filter?: Filter<AttractionsDet>,
  ): Promise<AttractionsDet[]> {
    return this.attractionsDetRepository.find(filter);
  }

  @patch('/attractions-dets', {
    responses: {
      '200': {
        description: 'AttractionsDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttractionsDet, {partial: true}),
        },
      },
    })
    attractionsDet: AttractionsDet,
    @param.where(AttractionsDet) where?: Where<AttractionsDet>,
  ): Promise<Count> {
    return this.attractionsDetRepository.updateAll(attractionsDet, where);
  }

  @get('/attractions-dets/{id}', {
    responses: {
      '200': {
        description: 'AttractionsDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AttractionsDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AttractionsDet, {exclude: 'where'}) filter?: FilterExcludingWhere<AttractionsDet>
  ): Promise<AttractionsDet> {
    return this.attractionsDetRepository.findById(id, filter);
  }

  @patch('/attractions-dets/{id}', {
    responses: {
      '204': {
        description: 'AttractionsDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AttractionsDet, {partial: true}),
        },
      },
    })
    attractionsDet: AttractionsDet,
  ): Promise<void> {
    await this.attractionsDetRepository.updateById(id, attractionsDet);
  }

  @put('/attractions-dets/{id}', {
    responses: {
      '204': {
        description: 'AttractionsDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() attractionsDet: AttractionsDet,
  ): Promise<void> {
    await this.attractionsDetRepository.replaceById(id, attractionsDet);
  }

  @del('/attractions-dets/{id}', {
    responses: {
      '204': {
        description: 'AttractionsDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.attractionsDetRepository.deleteById(id);
  }
}
