import { makeObservable, observable } from 'mobx';

import type { SchemaFragment } from '../types';
import type { MirroredRegularNode } from './mirrored';
import type { RegularNode } from './RegularNode';
import type { RootNode } from './RootNode';

export abstract class BaseNode {
  public readonly id: string;

  public parent: RegularNode | RootNode | MirroredRegularNode | null = null;
  public readonly subpath: string[];

  public get path(): ReadonlyArray<string> {
    return this.parent === null ? this.subpath : [...this.parent.path, ...this.subpath];
  }

  public get depth(): number {
    return this.parent === null ? 0 : this.parent.depth + 1;
  }

  protected constructor(public readonly fragment: SchemaFragment) {
    this.id = `json-schema-tree-id-${Math.random().toString(36).slice(2)}`;
    this.subpath = [];

    makeObservable(this, {
      subpath: observable.shallow,
    });
  }

  public abstract toJSON(): SchemaFragment;
}
