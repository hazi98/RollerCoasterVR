import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Purchases,
  Users,
} from '../models';
import {PurchasesRepository} from '../repositories';

export class PurchasesUsersController {
  constructor(
    @repository(PurchasesRepository)
    public purchasesRepository: PurchasesRepository,
  ) { }

  @get('/purchases/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Purchases',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof Purchases.prototype.id,
  ): Promise<Users> {
    return this.purchasesRepository.user_purchases(id);
  }
}
