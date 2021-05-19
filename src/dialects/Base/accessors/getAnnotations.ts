import type { SchemaFragment } from '../../../types';
import { pick } from '../../../utils/pick';

const ANNOTATIONS = ['description', 'default'] as const;

export function getAnnotations(fragment: SchemaFragment) {
  return pick(fragment, ANNOTATIONS);
}
