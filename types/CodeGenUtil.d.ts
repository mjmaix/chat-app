import { OmitByValueExact } from 'utility-types';

declare global {
  /**
   * Top extractors
   */
  type ModelFromGetQuery<
    LQ extends GetQueryStructure,
    QueryName extends string
  > = GetValueOfQueryName<LQ, QueryName>;

  type ModelFromListQuery<
    LQ extends ListQueryStructure,
    QueryName extends string
  > = ListQueryItemModel<LQ, QueryName>;

  /**
   * Utils - GetQuery
   */

  interface GetQueryStructure {
    [k: string]: {
      [f: string]: any;
    } | null;
  }

  type GetValueOfQueryName<
    LQ extends GetQueryStructure,
    QueryName extends string
  > = NonNullable<LQ[QueryName]>;

  /**
   * Utils - ListItems
   */

  type ListQueryItemArrayStructure = Array<{
    [x: number]: any;
  } | null>;

  interface ListQueryStructure {
    [k: string]: {
      items: ListQueryItemArrayStructure | null;
    } | null;
  }

  type ListValueOfQueryName<
    LQ extends ListQueryStructure,
    QueryName extends string
  > = NonNullable<LQ[QueryName]>;

  type ListQueryValueOfItems<
    LQ extends ListQueryStructure,
    QueryName extends string
  > = NonNullable<ListValueOfQueryName<LQ, QueryName>['items']>;

  type ListQueryRemoveNullOnArrayValue<
    LQ extends ListQueryStructure,
    QueryName extends string
  > = Exclude<ListQueryValueOfItems<LQ, QueryName>, [null]>;

  type ListQueryItemModel<
    LQ extends ListQueryStructure,
    QueryName extends string
  > = NonNullable<ListQueryRemoveNullOnArrayValue<LQ, QueryName>[0]>;
}
