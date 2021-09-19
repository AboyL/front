
import *  as actionTypes from '../action-types';
let actions = {
    add1 () {
        return { type: actionTypes.ADD1 };
    },
    minus1 () {
        return { type: actionTypes.MINUS1 };
    },
    multiplication1 () {
        return { type: actionTypes.multiplication1 };
    },
    delayAdd () {
        return (dispatch) => {
            setTimeout(() => {
                dispatch({ type: actionTypes.ADD1 })
            }, 1000);
        }
    },
}

export default actions;