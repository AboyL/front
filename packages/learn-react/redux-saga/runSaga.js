import *  as effectTypes from './effectTypes';
//递归里调用runSaga我们可以近乎的认为是开始一个新的子进程，这个新的子进程会单独工作，跟当前的saga就无关
//在我们把saga全部执行完成会执行completeCallback

// saga 是一个generator函数
// 1 如果是take就进行监听并且阻塞
// 2 如果是put不阻塞并且发送请求
function runSaga (env, saga, completeCallback) {
    const { dispatch, channel, getState } = env
    const it = typeof saga === 'function' ? saga() : saga
    // 根据是否是saga来进行处理
    function next (value) {
        const { done, value: effect } = it.next(value)
        if (!done) {
            if (typeof effect[Symbol.iterator] === 'function') {
                runSaga(env, effect);
                //不会阻止当前saga继续向后走
                next();
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        // 好像源码里面不是这样实现的来着 take只是暂停
                        channel.once(effect.actionType, effect.listern ? () => {
                            runSaga(env, effect.listern.bind(null, effect.actionType))
                            next()
                        } : next)
                        break;
                    case effectTypes.PUT:
                        dispatch(effect.action)
                        next()
                        break;
                    case effectTypes.SELECT:
                        const state = effect.selector(getState())
                        next(state)
                        break;
                    default:
                        next()
                        break;
                }
            }
        }
    }
    next();
}
export default runSaga;