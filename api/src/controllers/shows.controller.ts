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
import {Shows} from '../models';
import {ShowsRepository} from '../repositories';

export class ShowsController {
  constructor(
    @repository(ShowsRepository)
    public showsRepository : ShowsRepository,
  ) {}

  @post('/shows', {
    responses: {
      '200': {
        description: 'Shows model instance',
        content: {'application/json': {schema: getModelSchemaRef(Shows)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shows, {
            title: 'NewShows',
            exclude: ['id'],
          }),
        },
      },
    })
    shows: Omit<Shows, 'id'>,
  ): Promise<Shows> {
    return this.showsRepository.create(shows);
  }

  @get('/shows/count', {
    responses: {
      '200': {
        description: 'Shows model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Shows) where?: Where<Shows>,
  ): Promise<Count> {
    return this.showsRepository.count(where);
  }

  @get('/shows', {
    responses: {
      '200': {
        description: 'Array of Shows model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Shows, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Shows) filter?: Filter<Shows>,
  ): Promise<Shows[]> {
    return this.showsRepository.find(filter);
  }

  @patch('/shows', {
    responses: {
      '200': {
        description: 'Shows PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shows, {partial: true}),
        },
      },
    })
    shows: Shows,
    @param.where(Shows) where?: Where<Shows>,
  ): Promise<Count> {
    return this.showsRepository.updateAll(shows, where);
  }

  @get('/shows/{id}', {
    responses: {
      '200': {
        description: 'Shows model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Shows, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Shows, {exclude: 'where'}) filter?: FilterExcludingWhere<Shows>
  ): Promise<Shows> {
    return this.showsRepository.findById(id, filter);
  }

  @patch('/shows/{id}', {
    responses: {
      '204': {
        description: 'Shows PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Shows, {partial: true}),
        },
      },
    })
    shows: Shows,
  ): Promise<void> {
    await this.showsRepository.updateById(id, shows);
  }

  @put('/shows/{id}', {
    responses: {
      '204': {
        description: 'Shows PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() shows: Shows,
  ): Promise<void> {
    await this.showsRepository.replaceById(id, shows);
  }

  @del('/shows/{id}', {
    responses: {
      '204': {
        description: 'Shows DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.showsRepository.deleteById(id);
  }
}
