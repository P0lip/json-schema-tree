import type { SchemaNodeKind } from '../../../nodes';
import type { SchemaFragment } from '../../../types';
import { getMatchingValidations } from '../../accessors/getMatchingValidations';
import { isNumber } from '../../accessors/guards/values';
import type { Validations } from '../../types';

const VALIDATION_TYPES: Validations = {
  number: [
    {
      key: 'exclusiveMaximum',
      value: isNumber,
    },
    {
      key: 'exclusiveMinimum',
      value: isNumber,
    },
  ],
  get integer() {
    return this.number;
  },
};

export function getValidations(schema: SchemaFragment, types: Set<SchemaNodeKind>): Record<string, unknown> {
  return getMatchingValidations(schema, VALIDATION_TYPES, types);
}
