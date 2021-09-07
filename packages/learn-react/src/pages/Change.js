import React from 'react';
import { useDispatch } from "../../react-redux"
import { Link } from 'react-router-dom';
import { push } from '../../connected-react-router'

export default () => {
  const dispatch = useDispatch()
  return <div>
    <button onClick={() => dispatch(push('/test'))} >go test</button>
    <div><Link to="/test" >test</Link></div>
    <div><Link to="/" >home</Link></div>
  </div>
}