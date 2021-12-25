import { REACT_ELEMENT } from './constants'
import type { MockElementProps, MockElementType, MockChildren, MockElement } from './types';
import { wrapToVdom } from './util'
import Component from './componentx'

export const createElement = (
  type: MockElementType,
  props: MockElementProps,
  ...children: MockElement[]
): MockElement => {
  let ref, key;
  if (props) {
    ref = props.ref;
    key = props.key;
    delete props.ref;
    delete props.key;
  }
  let child: any = null
  if (children.length === 1) {
    child = wrapToVdom(children[0])
  } else if (children.length > 1) {
    child = children.map(v => wrapToVdom(v))
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    ref,
    key,
    props: {
      ...props,
      children: child
    }
  }
}

export { Component }
export default { Component, createElement }
