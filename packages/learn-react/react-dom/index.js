
import { REACT_TEXT } from '../react/constants'

// 更新属性
export const updateProps = (dom, oldProps, newProps) => {
  for (let key in newProps) {
    if (key === 'children') {
      continue
    }
    if (key === 'style') {
      const style = newProps[key]
      for (let s in style) {
        dom.style[s] = style[s]
      }
      continue
    }
    dom[key] = newProps[key]
  }
  // 删除掉以前有的现在没有的元素
  if (oldProps) {
    for (let key in oldProps) {
      if (!newProps.hasOwnProperty(key)) {
        dom[key] = null
      }
    }
  }
}

export const reconcileChildren = (children, container) => {
  for (let child of children) {
    mount(child, container)
  }
}
export const createDOM = (vdom) => {
  // 根据type来进行判断
  let { type, props } = vdom;
  let dom = null
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props)
  } else {
    dom = document.createElement(type)
  }
  // 处理props
  if (props) {
    updateProps(dom, null, props);
    // 处理子元素
    const { children } = props
    if (children) {
      if (Array.isArray(children)) {
        // 进行循环处理
        reconcileChildren(children, dom)
      } else if (typeof children === 'object' && children.$$typeof) {
        // 将子元素挂载到父元素上 也就是挂载到dom上面去
        mount(children, dom)
      }
    }
  }
  return dom
}

export const mount = (vdom, container) => {
  const newDom = createDOM(vdom)
  container.appendChild(newDom);
}

// 进行渲染
export const render = (vdom, container) => {
  mount(vdom, container)
}