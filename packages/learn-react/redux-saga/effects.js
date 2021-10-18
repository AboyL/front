
import *  as effectTypes from './effectTypes';
//等待actionType派发
export function take (actionType, listern) {
    return { type: effectTypes.TAKE, actionType, listern };
}
//直接向仓库 派发action
export function put (action) {
    return { type: effectTypes.PUT, action };
}

export function select (selector) {
    return { type: effectTypes.SELECT, selector };
}

export function fork (saga) {
    //如果遇到了fork指令，意思着要开启一个新的子进程 执行saga
    return { type: effectTypes.FORK, saga };
}

export function takeEvery (actionType, saga) {
    function* takeEveryHelper () {
        while(true){
            const action = yield take(actionType)
            yield fork(saga, action)
        }
    }
    return fork(takeEveryHelper)
}


export function call(fn,...args){
    return {type:effectTypes.CALL,fn,args};
}
export function cps(fn,...args){
    return {type:effectTypes.CPS,fn,args};
}