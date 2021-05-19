import type { Dictionary } from '@stoplight/types';

import type { SchemaNodeKind } from '../../../nodes/types';
import type { SchemaFragment } from '../../../types';
import { isObjectLiteral } from '../../../utils';
import { isBoolean, isNumber, isString } from '../../accessors/guards/values';
import type { Validator } from '../../types';

const COMMON_VALIDATION_TYPES: Validator[] = [
  {
    key: 'readOnly',
    value: isBoolean,
  },
  {
    key: 'writeOnly',
    value: isBoolean,
  },
];

const VALIDATION_TYPES: Partial<Record<SchemaNodeKind, Validator[]>> = {
  string: [
    {
      key: 'minLength',
      value: isNumber,
    },
    {
      key: 'maxLength',
      value: isNumber,
    },
    {
      key: 'pattern',
      value: isString,
    },
  ],
  number: [
    {
      key: 'multipleOf',
      value: isNumber,
    },
    {
      key: 'minimum',
      value: isNumber,
    },
    {
      key: 'maximum',
      value: isNumber,
    },
  ],
  get integer() {
    return this.number;
  },
  object: [
    {
      key: 'additionalProperties',
      value: (value: unknown): value is SchemaFragment | boolean => isObjectLiteral(value) || isBoolean(value),
    },
    { key: 'minProperties', value: isNumber },
    { key: 'maxProperties', value: isNumber },
    {
      key: 'required',
      value: (value: unknown): value is string[] => Array.isArray(value) && value.every(isString),
    },
  ],
  array: [
    {
      key: 'additionalItems',
      value: (value: unknown): value is SchemaFragment | SchemaFragment[] | boolean =>
        isObjectLiteral(value) || isBoolean(value),
    },
    { key: 'minItems', value: isNumber },
    { key: 'maxItems', value: isNumber },
    { key: 'uniqueItems', value: isBoolean },
  ],
};

function getTypeValidations(types: Set<SchemaNodeKind>): Validator[] {
  const extraValidations: Validator[] = [];

  for (const type of types) {
    const value = VALIDATION_TYPES[type];
    if (value !== void 0) {
      extraValidations.push(...value);
    }
  }

  return extraValidations;
}

export function getValidations(fragment: SchemaFragment, types: Set<SchemaNodeKind>): Dictionary<unknown> {
  const availableValidations = [...COMMON_VALIDATION_TYPES, ...(types === null ? [] : getTypeValidations(types))];
  const values = {};

  for (const { key, value } of availableValidations) {
    if (key in fragment && value(fragment[key])) {
      values[key] = fragment[key];
    }
  }

  return values;
}
