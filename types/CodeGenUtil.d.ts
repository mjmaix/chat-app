import { OmitByValueExact } from 'utility-types';

declare global {
  type ModelFromListQuery<
    LQ extends GeneralLisQueryStructure,
    QueryName extends string
  > = ExtractAsRequiredModel<LQ, QueryName>;
}

type ItemArrayStructure = Array<{
  [x: number]: any;
} | null>;

interface GeneralLisQueryStructure {
  [k: string]: {
    items: ItemArrayStructure | null;
  } | null;
}

type ExtractListKey1<
  LQ extends GeneralLisQueryStructure,
  QueryName extends string
> = NonNullable<LQ[QueryName]>;

type ExtractListItems<
  LQ extends GeneralLisQueryStructure,
  QueryName extends string
> = NonNullable<ExtractListKey1<LQ, QueryName>['items']>;

type CleanListItemArrayValue<
  LQ extends GeneralLisQueryStructure,
  QueryName extends string
> = Exclude<ExtractListItems<LQ, QueryName>, [null]>;

type ExtractAsRequiredModel<
  LQ extends GeneralLisQueryStructure,
  QueryName extends string
> = NonNullable<CleanListItemArrayValue<LQ, QueryName>[0]>;
