import { REACT_TEXT, REACT_ELEMENT } from './constants'
import type { MockElement } from './types';

// 统一节点
export function wrapToVdom(element: MockElement) {
  return typeof element === 'string' || typeof element === 'number' ? {
    $$typeof: REACT_ELEMENT, type: REACT_TEXT, content: element
  } : element;
}