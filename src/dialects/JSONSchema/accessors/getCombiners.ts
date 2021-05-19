import { SchemaCombinerName } from '../../../nodes/types';
import type { SchemaFragment } from '../../../types';

export function getCombiners(fragment: SchemaFragment): SchemaCombinerName[] {
  const combiners: SchemaCombinerName[] = [];

  if (SchemaCombinerName.AnyOf in fragment) {
    combiners.push(SchemaCombinerName.AnyOf);
  }

  if (SchemaCombinerName.OneOf in fragment) {
    combiners.push(SchemaCombinerName.OneOf);
  }

  if (SchemaCombinerName.AllOf in fragment) {
    combiners.push(SchemaCombinerName.AllOf);
  }

  return combiners;
}
