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
import {ToursDet} from '../models';
import {ToursDetRepository} from '../repositories';

export class ToursDetController {
  constructor(
    @repository(ToursDetRepository)
    public toursDetRepository : ToursDetRepository,
  ) {}

  @post('/tours-dets', {
    responses: {
      '200': {
        description: 'ToursDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(ToursDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ToursDet, {
            title: 'NewToursDet',
            exclude: ['id'],
          }),
        },
      },
    })
    toursDet: Omit<ToursDet, 'id'>,
  ): Promise<ToursDet> {
    return this.toursDetRepository.create(toursDet);
  }

  @get('/tours-dets/count', {
    responses: {
      '200': {
        description: 'ToursDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ToursDet) where?: Where<ToursDet>,
  ): Promise<Count> {
    return this.toursDetRepository.count(where);
  }

  @get('/tours-dets', {
    responses: {
      '200': {
        description: 'Array of ToursDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ToursDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ToursDet) filter?: Filter<ToursDet>,
  ): Promise<ToursDet[]> {
    return this.toursDetRepository.find(filter);
  }

  @patch('/tours-dets', {
    responses: {
      '200': {
        description: 'ToursDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ToursDet, {partial: true}),
        },
      },
    })
    toursDet: ToursDet,
    @param.where(ToursDet) where?: Where<ToursDet>,
  ): Promise<Count> {
    return this.toursDetRepository.updateAll(toursDet, where);
  }

  @get('/tours-dets/{id}', {
    responses: {
      '200': {
        description: 'ToursDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ToursDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ToursDet, {exclude: 'where'}) filter?: FilterExcludingWhere<ToursDet>
  ): Promise<ToursDet> {
    return this.toursDetRepository.findById(id, filter);
  }

  @patch('/tours-dets/{id}', {
    responses: {
      '204': {
        description: 'ToursDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ToursDet, {partial: true}),
        },
      },
    })
    toursDet: ToursDet,
  ): Promise<void> {
    await this.toursDetRepository.updateById(id, toursDet);
  }

  @put('/tours-dets/{id}', {
    responses: {
      '204': {
        description: 'ToursDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() toursDet: ToursDet,
  ): Promise<void> {
    await this.toursDetRepository.replaceById(id, toursDet);
  }

  @del('/tours-dets/{id}', {
    responses: {
      '204': {
        description: 'ToursDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.toursDetRepository.deleteById(id);
  }
}
