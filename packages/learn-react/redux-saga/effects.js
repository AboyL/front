
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