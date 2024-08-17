import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { DefaultPagination } from '../interfaces/default-pagination.interface'

export const PaginationParams = createParamDecorator(
  (
    data: DefaultPagination = {
      defaultPage: 1,
      defaultLimit: 10,
      defaultOrder: {},
      defaultSortOrder: 'ASC',
    },
    ctx: ExecutionContext,
  ) => {
    let {
      query: { page, limit, sortBy, sortOrder, joins, ...params },
    } = ctx.switchToHttp().getRequest()

    const { defaultPage, defaultLimit, defaultOrder, defaultSortOrder } = data

    const order = sortBy
      ? { [sortBy]: sortOrder ? sortOrder : defaultSortOrder }
      : defaultOrder

    limit = limit && limit > 0 ? +limit : defaultLimit
    page = page ?? defaultPage

    return Object.assign(data ? data : {}, {
      page,
      limit,
      order,
      joins,
      params,
    })
  },
)
