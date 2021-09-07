import React, { useEffect } from 'react';
import ReactReduxContext from "./reactReduxContext"
const Provider = (props) => {
  const { store, children } = props
  return <ReactReduxContext.Provider value={{ store }} >
    {children}
  </ReactReduxContext.Provider>
}

export default Provider