import type { SchemaFragment } from '../../../types';

export function getAnnotations(fragment: SchemaFragment) {
  return {
    ...('x-example' in fragment ? fragment['x-example'] : null),
    // @ts-ignore
    ...(fragment['x-deprecated'] === true ? { deprecated: true } : null),
  };
}
