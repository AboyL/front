import { call, put, takeEvery,take, takeLatest } from 'redux-saga/effects'
import *  as actionTypes from './action-types';

const mockTime = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5)
    }, 1000);
  })
}
function* mock (action) {
  console.log('mock', action);
  try {
    // const number = yield call(mockTime);
    const number = 5
    yield put({ type: actionTypes.multiplication1, playload: { number } });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* rootSoga () {
  // take是会阻塞的，并且只会执行一次
  yield take("setTimeChange", mock);
  // yield take("setTimeChange");
  // yield takeEvery("setTimeChange", mock);
  console.log('xxxx');
}

export default rootSoga