import { observable } from 'mobx';

import { SchemaCombinerName } from '../../../nodes/types';
import type { SchemaFragment } from '../../../types';

export function getCombiners(fragment: SchemaFragment): Set<SchemaCombinerName> {
  const combiners: SchemaCombinerName[] = [];

  if (SchemaCombinerName.AllOf in fragment) {
    combiners.push(SchemaCombinerName.AllOf);
  }

  return observable.set(combiners);
}
