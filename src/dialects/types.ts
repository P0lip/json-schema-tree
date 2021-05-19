import type { SchemaNodeKind } from '../nodes/types';

export type Validator = {
  key: string;
  value(input: unknown): boolean;
};

export type Validations = Partial<Record<SchemaNodeKind, Validator[]>>;
