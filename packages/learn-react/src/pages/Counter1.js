
import React from 'react';
import * as actionTypes from '../store/action-types';
import { connect } from '../../react-redux'

const Counter1 = ({
  test,
  add1,
  minus1
}) => {
  return (
    <div>
      <button onClick={add1} >add</button>
      <button onClick={minus1} >minus</button>
      <div>counter1 test{test}</div>
    </div>
  )
}
const mapStateToProps = state => ({
  test: state.counter1.number,
})

const mapDispatchToProps = dispath => ({
  add1 () {
    dispath({ type: actionTypes.ADD1 });
  },
  minus1 () {
    dispath({ type: actionTypes.MINUS1 });
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter1)