export type QueryableColumn<T> = {
  id: string;
  header: string;
  compare?: (a: T, b: T) => number;
};

export type Query<T> = {
  select?: (keyof T)[];
  where?: WhereClause<T>;
  orderBy?: OrderByClause<T>[];
};

export type WhereClause<T> =
  | WhereClause<T>[]
  | {
      [K in keyof T]?: QueryPredicate;
    };

export type QueryPredicate =
  | QueryPredicate[]
  | string
  | number
  | boolean
  | null
  | {};

export type OrderByClause<T> = {
  column: keyof T;
  direction: "asc" | "desc";
};

export function executeQuery<T>(
  data: T[],
  query: Query<T>,
  where?: (item: T) => boolean,
): T[] {
  const filteredResult = data.filter(
    (item) => checkWhereClause(item, query.where) && (!where || where(item)),
  );

  const { orderBy } = query;
  const sortedResult =
    !orderBy || orderBy.length === 0
      ? filteredResult
      : filteredResult.sort((a, b) => compareByOrderBys(a, b, orderBy));

  const { select } = query;
  const selectedResult = !select
    ? sortedResult
    : applySelect(select, sortedResult);

  return selectedResult;
}

function checkWhereClause<T>(item: T, where?: WhereClause<T>): boolean {
  console.log("Checking where clause:", where, "for item:", item);
  if (!where) {
    return true;
  }

  if (Array.isArray(where)) {
    // Arrays are treated as AND conditions
    return where.every((clause) => checkWhereClause(item, clause));
  }

  for (const key in where) {
    const matchValue = where[key];
    const actualValue = item[key];
    if (
      matchValue !== undefined &&
      !checkWherePredicate(actualValue, matchValue)
    ) {
      return false;
    }
  }

  return true;
}

function checkWherePredicate(
  actualValue: any,
  matchValue: QueryPredicate,
): boolean {
  if (Array.isArray(matchValue)) {
    // Arrays are treated as OR conditions
    return matchValue.some((value) => checkWherePredicate(actualValue, value));
  }
  return actualValue === matchValue;
}

function compareByOrderBys<T>(
  a: T,
  b: T,
  orderBys: OrderByClause<T>[],
): number {
  for (const orderBy of orderBys) {
    const column = orderBy.column;
    const direction = orderBy.direction;
    const aValue = a[column];
    const bValue = b[column];

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    }
  }

  return 0;
}

function applySelect<T>(select: (keyof T)[], data: T[]): T[] {
  return data.map((item) => {
    const result: any = {};
    for (const key of select) {
      result[key] = item[key];
    }
    return result as T;
  });
}
