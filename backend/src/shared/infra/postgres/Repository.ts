import { DbInterface } from '@common-types/DbInterface';
import { createModels } from '@shared/infra/postgres/models';

export default class Repository {
  protected db: DbInterface;

  constructor() {
    this.db = createModels();
  }
}
