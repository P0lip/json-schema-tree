import type { SchemaFragment } from '../types';
import { BaseNode } from './BaseNode';
import type { SchemaNode } from './types';

export class RootNode extends BaseNode {
  public readonly parent = null;
  public readonly children: SchemaNode[];

  constructor(public readonly fragment: SchemaFragment) {
    super(fragment);
    this.children = [];
  }

  public toJSON(): SchemaFragment {
    if (this.children.length !== 1) {
      return this.children.map(child => child.toJSON());
    }

    return this.children[0].toJSON();
  }
}
