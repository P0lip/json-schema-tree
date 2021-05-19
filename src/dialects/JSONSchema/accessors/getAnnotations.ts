import type { SchemaFragment } from '../../../types';

export function getAnnotations(fragment: SchemaFragment) {
  return {
    ...(Array.isArray(fragment.examples) ? { examples: fragment.examples } : null),
    // @ts-ignore
    ...(fragment.deprecated === true ? { deprecated: fragment.deprecated } : null),
  };
}
