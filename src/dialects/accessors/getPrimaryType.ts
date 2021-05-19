import { SchemaNodeKind } from '../../nodes/types';
import type { SchemaFragment } from '../../types';

export function getPrimaryType(fragment: SchemaFragment, types: Set<SchemaNodeKind>) {
  if (types.size > 0) {
    if (types.has(SchemaNodeKind.Object)) {
      return SchemaNodeKind.Object;
    }

    if (types.has(SchemaNodeKind.Array)) {
      return SchemaNodeKind.Array;
    }

    return types.values().next().value;
  }

  return null;
}
