import { useContext } from 'react';
import ReactReduxContext from "../reactReduxContext";

const useDispatch = () => {
  const { store } = useContext(ReactReduxContext)
  return store.dispatch
}

export default useDispatch