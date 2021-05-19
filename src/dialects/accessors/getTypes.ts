import { observable } from 'mobx';

import type { SchemaNodeKind } from '../../nodes/types';
import type { SchemaFragment } from '../../types';
import { isValidType } from './guards/isValidType';
import { inferType } from './inferType';

export function getTypes(fragment: SchemaFragment): Set<SchemaNodeKind> {
  if ('type' in fragment) {
    if (Array.isArray(fragment.type)) {
      return observable.set(fragment.type.filter(isValidType));
    } else if (isValidType(fragment.type)) {
      return observable.set([fragment.type]);
    }
  }

  const inferredType = inferType(fragment);
  if (inferredType !== null) {
    return observable.set([inferredType]);
  }

  return observable.set([]);
}
