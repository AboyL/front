import { addEvent } from './event';
import { MockElementProps } from './../react/types';

import { REACT_TEXT } from '../react/constants'
import { MockElement } from '../react/types'

// 更新属性
export const updateProps = (dom: HTMLElement, oldProps: MockElementProps | null, newProps: MockElementProps) => {
  for (let key in newProps) {
    if (key === 'children') {
      continue
    }
    if (key === 'style') {
      const style = newProps.style
      for (let s in style) {
        dom.style[s] = style[s]
      }
      continue
    }
    // 事件处理
    if (/^on[A-Z].*/.test(key)) {
      // 使用合成事件进行处理
      // (dom as any)[key.toLowerCase()] = newProps[key]
      addEvent(dom, key.toLowerCase(), newProps[key])
      continue
    }
    (dom as any)[key] = newProps[key]
  }
  // 删除掉以前有的现在没有的元素
  if (oldProps) {
    for (let key in oldProps) {
      if (!newProps.hasOwnProperty(key)) {
        (dom as any)[key] = null
      }
    }
  }
}

export const reconcileChildren = (children: MockElement[], container: HTMLElement) => {
  for (let child of children) {
    mount(child, container)
  }
}

export const mountFunctionComponent = (vdom: any): any => {
  let { type, props } = vdom;
  const renderVdom = type(props)
  // 进行diff
  vdom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}

export const mountClassComponent = (vdom: any): any => {
  let { type, props } = vdom;
  let classInstant = new type(props)
  const renderVdom = classInstant.render()
  // 进行diff
  vdom.oldRenderVdom = classInstant.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}

export const createDOM = (vdom: MockElement) => {
  // 根据type来进行判断
  let { type, props } = vdom;
  let dom = null
  if (type === REACT_TEXT) {
    dom = document.createTextNode(`${vdom.content}`)
    // 处理函数组件
  } else if (typeof type === 'function') {
    // 处理类
    if ((type as any).isReactComponent) {
      return mountClassComponent(vdom)
    }
    return mountFunctionComponent(vdom)
  } else {
    dom = document.createElement(type)
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
  }
  //让vdom的dom属性指定它创建出来的真实DOM
  vdom.dom = dom;
  return dom
}

export const mount = (vdom: MockElement, container: HTMLElement) => {
  const newDom = createDOM(vdom)
  container.appendChild(newDom);
}

// 进行渲染
export const render = (vdom: MockElement, container: HTMLElement) => {
  mount(vdom, container)
}