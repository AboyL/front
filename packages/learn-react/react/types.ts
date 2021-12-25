import { REACT_ELEMENT, REACT_TEXT } from './constants'
export type MockChildren = MockElement | MockElement[]

export type MockElementProps = {
  style: CSSStyleDeclaration,
  children?: MockChildren,
  [key: string]: any
}

export type MockElementType = string | typeof REACT_TEXT

export type MockElement = {
  $$typeof: typeof REACT_ELEMENT,
  type: MockElementType,
  ref: Element,
  key: string,
  content?: string,
  props?: MockElementProps
}