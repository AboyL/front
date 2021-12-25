import React from "react";

import * as MockReact from './index'

(window as any).useMockReact = true

let Mock = null

if ((window as any)) {
  Mock = MockReact
} else {
  Mock = React
}

export default Mock