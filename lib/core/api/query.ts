import { QueryParamType } from "@ui/hooks/query-param";
import { AppError } from "@util/errors";

export const execQuery = (
  model: any,
  filter: QueryParamType,
  fields: string[],
  search: string[],
  custom: any[],
  select: any,
  orderBy?: any
) => {
  let [take, page] =
    filter.size === "*"
      ? [undefined, 0]
      : [Number(filter.size), Number(filter.page)];
  if (take !== undefined && (take <= 0 || page <= 0))
    throw AppError.BadRequest("validation.paging.size");

  let where: any = { AND: [] };
  fields.map((name) => {
    if (filter[name] && filter[name] !== "*")
      where.AND.push({ [name]: filter[name] });
  });
  if (search && search.length > 0)
    where.AND.push({
      OR: search.map((name) => ({
        [name]: { contains: filter.text, mode: "insensitive" },
      })),
    });
  custom?.filter((__) => __).map((item) => where.AND.push(item));

  where.AND.length === 1
    ? (where = where.AND[0])
    : !where.AND.length
    ? {}
    : null;

  return async () => {
    const total = await model.count({ where });
    return {
      total,
      pages: !take ? 1 : Math.ceil(total / take),
      data: await model.findMany({
        where,
        select,
        orderBy: orderBy ? orderBy : { createdAt: "desc" },
        skip: take ? take * (page - 1) : undefined,
        take,
      }),
    };
  };
};
