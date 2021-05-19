import type { SchemaCombinerName, SchemaNodeKind } from '../nodes';
import type { SchemaFragment } from '../types';

export abstract class SchemaDialect {
  public abstract readonly id: string;

  abstract getCombiners(fragment: SchemaFragment): Set<SchemaCombinerName>;
  abstract getValidations(fragment: SchemaFragment, types: Set<SchemaNodeKind>): Record<string, unknown>;
  abstract getAnnotations(fragment: SchemaFragment): Record<string, unknown>;
}
