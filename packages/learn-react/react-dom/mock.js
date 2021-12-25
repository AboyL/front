import ReactDom from "react-dom";

import * as ReactDomMock from './index'

window.useMockReactDom = true

let Mock = null

if (window.useMockReactDom) {
  Mock = ReactDomMock
} else {
  Mock = ReactDom
}

export default Mock