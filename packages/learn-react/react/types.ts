import { REACT_ELEMENT, REACT_FORWARD_REF_TYPE, REACT_TEXT } from './constants'
export type MockChildren = MockElement | MockElement[]

export type MockElementProps = {
  style: CSSStyleDeclaration,
  children?: MockChildren,
  isReactComponent?: boolean,
  [key: string]: any
}

export type MockElementType = string | typeof REACT_TEXT | typeof REACT_FORWARD_REF_TYPE | {
  $$typeof: typeof REACT_FORWARD_REF_TYPE,
  render: any
}

export type MockElement = {
  $$typeof: typeof REACT_ELEMENT | typeof REACT_FORWARD_REF_TYPE,
  type: any,
  ref?: { current: Element },
  key: string,
  content?: string,
  dom?: HTMLElement | Text | null,
  props?: MockElementProps
}

export type FunctionComponentElement = () => MockElement