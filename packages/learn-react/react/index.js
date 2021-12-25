import { REACT_ELEMENT } from './constants'
import { wrapToVdom } from './util'

export const createElement = (type, props, ...children) => {
  let ref, key;
  if (props) {
    ref = props.ref;
    key = props.key;
    delete props.ref;
    delete props.key;
  }
  let child = null
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

