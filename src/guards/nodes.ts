import type { MirroredSchemaNode, ReferenceNode, RegularNode, SchemaNode } from '../nodes';
import { BaseNode } from '../nodes';

export function isRegularNode(node: SchemaNode): node is RegularNode {
  return 'types' in node && 'primaryType' in node && 'combiners' in node;
}

export function isMirroredNode(node: SchemaNode): node is MirroredSchemaNode {
  return 'mirroredNode' in node;
}

export function isReferenceNode(node: unknown): node is ReferenceNode {
  return node instanceof BaseNode && 'external' in node && 'value' in node;
}
