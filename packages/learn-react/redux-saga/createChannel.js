function createChannel () {
    let listeners = [];
    // 原版里面叫做take take只会执行一次 其他的都是根据这个衍生过来的
    function once (type, listener) {
        listener.type = type;
        listener.cancel = () => listeners = listeners.filter(item => item !== listener)
        listeners.push(listener);
    }
    // 在原版里面这个是叫做put
    function emit (action) {
        listeners.forEach(listener => {
            if (listener.type === action.type) {
                listener.cancel();
                listener(action);
            }
        });
    }
    return { once, emit }
}
export default createChannel;
