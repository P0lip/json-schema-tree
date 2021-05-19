import type { SchemaDialect } from '../dialects/SchemaDialect';
import type { SchemaFragment } from '../types';

export type SchemaTreeOptions = {
  mergeAllOf: boolean;
  refResolver: SchemaTreeRefDereferenceFn | null;
  dialect: SchemaDialect;
};

export type SchemaTreeRefInfo = {
  source: string | null;
  pointer: string | null;
};

export type SchemaTreeRefDereferenceFn = (
  ref: SchemaTreeRefInfo,
  propertyPath: string[] | null,
  schema: SchemaFragment,
) => SchemaFragment;
