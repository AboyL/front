import { createDOM } from "."

export const findDOM = (vdom: any): any => {

  if (!vdom) {
    return null
  }
  if (vdom.dom) {
    return vdom.dom
  }
  // 此时是函数式组件递归返回
  return findDOM(vdom.oldRenderVdom)
}

export function compareTwoVdom(parentDOM: HTMLElement, oldVdom: any, newVdom: any) {
  // 先做直接的替换
  //如果新老都是null，什么都不做
  const oldDom = findDOM(oldVdom)
  const newDom = createDOM(newVdom)
  parentDOM.replaceChild(newDom, oldDom)
}