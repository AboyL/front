let { AsyncParallelHook } = require('tapable');
let hook = new AsyncParallelHook();
//作用类似于Promise.all
// name的作用?
console.time('cost');
hook.tapPromise('1', () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, 1000);
    });
});
hook.tapPromise('2', () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
});
hook.tapPromise('3', (arg) => {
    console.log(arg)
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
});
hook.promise(2).then(res => {
    console.timeEnd('cost');
    console.log(res)
});