import { DataSource, Repository } from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'

export class BaseRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager())
  }
  
}
