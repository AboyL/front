
import React, { useState, useEffect } from 'react';
import action from '../store/actions/counter2'
import { connect } from 'react-redux'

const Counter2 = ({
  test,
  add2,
  minus2
}) => {
  return (
    <div>
      <button onClick={add2} >add</button>
      <button onClick={minus2} >minus</button>
      <div>counter1 test{test}</div>
    </div>
  )
}
const mapStateToProps = state => ({
  test: state.counter2.number,
})

// 支持hooks
export default connect(
  mapStateToProps,
  // 这里可以是一个函数也可以是一个对象，
  // 参考 https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object
  action
)(Counter2)