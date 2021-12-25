import { REACT_TEXT, REACT_ELEMENT } from './constants'
// 统一节点
export function wrapToVdom (element) {
  return typeof element === 'string' || typeof element === 'number' ? {
    $$typeof: REACT_ELEMENT, type: REACT_TEXT, props: element
  } : element;
}