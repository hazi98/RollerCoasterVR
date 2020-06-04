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
import {ShowsDet} from '../models';
import {ShowsDetRepository} from '../repositories';

export class ShowsDetController {
  constructor(
    @repository(ShowsDetRepository)
    public showsDetRepository : ShowsDetRepository,
  ) {}

  @post('/shows-dets', {
    responses: {
      '200': {
        description: 'ShowsDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(ShowsDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShowsDet, {
            title: 'NewShowsDet',
            exclude: ['id'],
          }),
        },
      },
    })
    showsDet: Omit<ShowsDet, 'id'>,
  ): Promise<ShowsDet> {
    return this.showsDetRepository.create(showsDet);
  }

  @get('/shows-dets/count', {
    responses: {
      '200': {
        description: 'ShowsDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ShowsDet) where?: Where<ShowsDet>,
  ): Promise<Count> {
    return this.showsDetRepository.count(where);
  }

  @get('/shows-dets', {
    responses: {
      '200': {
        description: 'Array of ShowsDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ShowsDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ShowsDet) filter?: Filter<ShowsDet>,
  ): Promise<ShowsDet[]> {
    return this.showsDetRepository.find(filter);
  }

  @patch('/shows-dets', {
    responses: {
      '200': {
        description: 'ShowsDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShowsDet, {partial: true}),
        },
      },
    })
    showsDet: ShowsDet,
    @param.where(ShowsDet) where?: Where<ShowsDet>,
  ): Promise<Count> {
    return this.showsDetRepository.updateAll(showsDet, where);
  }

  @get('/shows-dets/{id}', {
    responses: {
      '200': {
        description: 'ShowsDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ShowsDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ShowsDet, {exclude: 'where'}) filter?: FilterExcludingWhere<ShowsDet>
  ): Promise<ShowsDet> {
    return this.showsDetRepository.findById(id, filter);
  }

  @patch('/shows-dets/{id}', {
    responses: {
      '204': {
        description: 'ShowsDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShowsDet, {partial: true}),
        },
      },
    })
    showsDet: ShowsDet,
  ): Promise<void> {
    await this.showsDetRepository.updateById(id, showsDet);
  }

  @put('/shows-dets/{id}', {
    responses: {
      '204': {
        description: 'ShowsDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() showsDet: ShowsDet,
  ): Promise<void> {
    await this.showsDetRepository.replaceById(id, showsDet);
  }

  @del('/shows-dets/{id}', {
    responses: {
      '204': {
        description: 'ShowsDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.showsDetRepository.deleteById(id);
  }
}
