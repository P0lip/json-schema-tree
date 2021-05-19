import { observable } from 'mobx';

import type { SchemaCombinerName, SchemaNodeKind } from '../../nodes';
import type { SchemaFragment } from '../../types';
import { SchemaDialect } from '../SchemaDialect';
import { getAnnotations } from './accessors/getAnnotations';
import { getValidations } from './accessors/getValidations';

export class SharedSchemaDialect extends SchemaDialect {
  public readonly id = 'shared';

  public getCombiners(_fragment: SchemaFragment) {
    return new Set<SchemaCombinerName>();
  }

  public getAnnotations(fragment: SchemaFragment): Record<string, unknown> {
    return observable.object(getAnnotations(fragment));
  }

  public getValidations(fragment: SchemaFragment, types: Set<SchemaNodeKind>): Record<string, unknown> {
    return observable(getValidations(fragment, types));
  }
}
