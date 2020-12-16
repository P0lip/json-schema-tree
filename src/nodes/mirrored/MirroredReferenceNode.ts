import { isReferenceNode } from '../../guards';
import { isObject } from '../../utils';
import { BaseNode } from '../BaseNode';
import type { ReferenceNode } from '../ReferenceNode';

export class MirroredReferenceNode extends BaseNode implements ReferenceNode {
  constructor(public readonly mirroredNode: ReferenceNode) {
    super(mirroredNode.fragment);
  }

  get error() {
    return this.mirroredNode.error;
  }

  get value() {
    return this.mirroredNode.value;
  }

  public get external() {
    return this.mirroredNode.external;
  }

  static [Symbol.hasInstance](instance: unknown) {
    return isObject(instance) && isReferenceNode((instance as any).mirroredNode);
  }
}
