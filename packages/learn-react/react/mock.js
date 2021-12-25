import React from "react";

import * as MockReact from './index'

window.useMockReact = true

let Mock = null

if (window.useMockReact) {
  Mock = MockReact
} else {
  Mock = React
}

export default Mock