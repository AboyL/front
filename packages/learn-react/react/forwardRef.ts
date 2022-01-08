import { REACT_FORWARD_REF_TYPE } from "./constants"

export const forwardRef = (render: Function) => {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render
  }
}