import *  as effectTypes from './effectTypes';
//递归里调用runSaga我们可以近乎的认为是开始一个新的子进程，这个新的子进程会单独工作，跟当前的saga就无关
//在我们把saga全部执行完成会执行completeCallback

// saga 是一个generator函数
// 1 如果是take就进行监听并且阻塞
// 2 如果是put不阻塞并且发送请求
function runSaga (env, saga, completeCallback) {
    const { dispatch,channel } = env
    const it = saga()
    function next (value) {
        const { done, value: effect } = it.next()
        if (!done) {
            switch (effect.type) {
                case effectTypes.TAKE:
                    channel.once(effect.actionType,effect.listern?()=>{
                        runSaga(env,effect.listern)
                        next()
                    }:next)
                    break;
                case effectTypes.PUT:
                    dispatch(effect.action)
                    next()
                    break;
                default:
                    next()
                    break;
            }
        }
    }
    next();
}
export default runSaga;