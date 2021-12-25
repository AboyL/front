import ReactDom from "react-dom";

import * as ReactDomMock from './index'

(window as any).useMockReactDom = true

let Mock = null

if ((window as any).useMockReactDom) {
  Mock = ReactDomMock
} else {
  Mock = ReactDom
}

export default Mock