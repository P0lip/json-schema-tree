import type { SchemaNodeKind } from '../../nodes/types';
import type { SchemaFragment } from '../../types';
import type { Validations, Validator } from '../types';

function getTypeValidations(validations: Validations, types: Set<SchemaNodeKind>): Validator[] {
  const matchedValidations: Validator[] = [];

  for (const type of types) {
    const value = validations[type];
    if (value !== void 0) {
      matchedValidations.push(...value);
    }
  }

  return matchedValidations;
}

export function getMatchingValidations(
  fragment: SchemaFragment,
  validations: Validations,
  types: Set<SchemaNodeKind>,
): Record<string, unknown> {
  const availableValidations = getTypeValidations(validations, types);
  const values = {};

  for (const { key, value } of availableValidations) {
    if (key in fragment && value(fragment[key])) {
      values[key] = fragment[key];
    }
  }

  return values;
}
