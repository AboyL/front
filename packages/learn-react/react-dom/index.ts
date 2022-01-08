import { addEvent } from './event';
import { MockElementProps } from './../react/types';

import { REACT_FORWARD_REF_TYPE, REACT_TEXT } from '../react/constants'
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
  let { type, props, ref } = vdom;
  let classInstance = new type(props)
  if (ref) {
    ref.current = classInstance
  }
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  const renderVdom = classInstance.render()
  // 进行diff
  vdom.oldRenderVdom = classInstance.oldRenderVdom = renderVdom
  let dom = createDOM(renderVdom);
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(this);
  }
  return dom;
}

export const mountForwardComponent = (vdom: any): any => {
  let { type, props, ref } = vdom;
  const renderVdom = type.render(props, ref)
  vdom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}

export const createDOM = (vdom: MockElement) => {
  // 根据type来进行判断
  let { type, props, ref } = vdom;
  let dom = null
  // 处理ref
  if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    // 此时 type.render 就是原来的函数
    return mountForwardComponent(vdom);//转发组件

  } else if (type === REACT_TEXT) {
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
  if (ref) {
    ref.current = dom as HTMLElement
  }
  return dom
}

export const mount = (vdom: MockElement, container: HTMLElement) => {
  const newDom = createDOM(vdom)
  container.appendChild(newDom);
  if (newDom.componentDidMount) {
    newDom.componentDidMount()
  }
}

// 进行渲染
export const render = (vdom: MockElement, container: HTMLElement) => {
  mount(vdom, container)
}