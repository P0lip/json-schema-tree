import { observable } from 'mobx';

import type { SchemaCombinerName, SchemaNodeKind } from '../../nodes';
import type { SchemaFragment } from '../../types';
import { SharedSchemaDialect } from '../Base/SharedDialect';
import { getAnnotations } from './accessors/getAnnotations';
import { getCombiners } from './accessors/getCombiners';
import { getValidations } from './accessors/getValidations';

export class OAS2SchemaObjectDialect extends SharedSchemaDialect {
  public getCombiners(fragment: SchemaFragment): Set<SchemaCombinerName> {
    return observable.set(getCombiners(fragment));
  }

  public getAnnotations(fragment: SchemaFragment): Record<string, unknown> {
    return observable.object({
      ...super.getAnnotations(fragment),
      ...getAnnotations(fragment),
    });
  }

  public getValidations(fragment: SchemaFragment, types: Set<SchemaNodeKind>): Record<string, unknown> {
    return observable({
      ...super.getValidations(fragment, types),
      ...getValidations(fragment, types),
    });
  }
}
