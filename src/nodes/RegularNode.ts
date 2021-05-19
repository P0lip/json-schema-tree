import type { Dictionary } from '@stoplight/types';
import { computed, makeObservable, observable } from 'mobx';

import { getPrimaryType } from '../dialects/accessors/getPrimaryType';
import { getTypes } from '../dialects/accessors/getTypes';
import { unwrapArrayOrNull, unwrapStringOrNull } from '../dialects/accessors/unwrap';
import type { SchemaDialect } from '../dialects/SchemaDialect';
import { isRegularNode, isSchemaNode } from '../guards';
import type { SchemaFragment } from '../types';
import { BaseNode } from './BaseNode';
import type { ReferenceNode } from './ReferenceNode';
import { MirroredSchemaNode, SchemaCombinerName, SchemaNodeKind } from './types';

export class RegularNode extends BaseNode {
  public readonly $id: string;
  public readonly types: Set<SchemaNodeKind>;
  public readonly combiners: Set<SchemaCombinerName>;

  public readonly enum: Set<unknown>; // https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1
  public format: string | null; // https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-7
  public title: string | null;
  public children: (RegularNode | ReferenceNode | MirroredSchemaNode)[] | null | undefined;

  public readonly annotations: Record<string, unknown>;

  constructor(public readonly fragment: SchemaFragment, public readonly dialect: SchemaDialect) {
    super(fragment);

    this.$id = unwrapStringOrNull(fragment.$id) ?? this.id;
    this.types = getTypes(fragment);
    this.combiners = dialect.getCombiners(fragment);

    this.enum = observable.set('const' in fragment ? [fragment.const] : unwrapArrayOrNull(fragment.enum));
    this.format = unwrapStringOrNull(fragment.format);
    this.title = unwrapStringOrNull(fragment.title);

    this.annotations = dialect.getAnnotations(fragment);
    this.children = void 0;

    makeObservable(this, {
      format: observable,
      title: observable,
    });
  }

  public toJSON(): SchemaFragment {
    const children = this.children?.reduce((children, node) => {
      const [entry, key] = node.subpath;
      if (node.subpath.length === 1) {
        children[entry] = node.toJSON();
        return children;
      } else if (!(entry in children)) {
        // todo: tuples
        children[entry] = {};
      }

      children[entry][key] = node.toJSON();

      return children;
    }, {});

    return {
      ...this.fragment,
      ...(this.format !== null && { format: this.format }),
      ...(this.title !== null && { title: this.title }),
      $id: this.$id,
      ...children,
    };
  }

  @computed
  public get validations(): Dictionary<unknown> {
    return this.dialect.getValidations(this.fragment, this.types);
  }

  @computed
  public get primaryType(): SchemaNodeKind | null {
    // object (first choice) or array (second option), primitive last
    return getPrimaryType(this.fragment, this.types);
  }

  @computed
  public get simple() {
    return (
      this.primaryType !== SchemaNodeKind.Array && this.primaryType !== SchemaNodeKind.Object && this.combiners === null
    );
  }

  public get unknown() {
    return (
      this.types === null &&
      this.combiners === null &&
      this.format === null &&
      this.enum === null &&
      Object.keys(this.annotations).length + Object.keys(this.validations).length === 0
    );
  }

  static [Symbol.hasInstance](instance: unknown) {
    return isSchemaNode(instance) && isRegularNode(instance);
  }
}
