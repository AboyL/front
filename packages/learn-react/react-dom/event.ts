import { updateQueue } from "../react/Updater"

/**
 * document身上绑定的点击事件的实践处理函数 也就是事件代理
 * 通过函数的冒泡逐步执行下去
 * @param {*} nativeEvent 
 */
export const dispatchEvent = (nativeEvent: any) => {
  updateQueue.isBatchingUpdate = true
  //type = click target 事件源DOM 点击的是button的话就是button
  let { type, target } = nativeEvent;
  let eventType = `on${type}`;//onclick
  // 合成对象事件
  // 为了统一处理 兼容性
  // 为了进行阻止冒泡等处理 因为从当前的元素一步步往上找实际上有的元素 来判断是否有事件执行
  // 而普通的阻止冒泡没有办法让后面的事件不执行，因此需要一个代理产生标识符
  let syntheticEvent = createSyntheticEvent(nativeEvent);

  while (target) {
    let { _store } = target as any;
    let handler = _store && _store[eventType];
    if (handler) handler(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }

  updateQueue.batchUpdate()

}

// 对原生事件进行了一次拷贝操作
// 可以对原生事件进行封装，从而实现兼容性处理
function createSyntheticEvent(nativeEvent: any) {
  let syntheticEvent: { [p: string]: any } = {};
  for (let key in nativeEvent) {
    let value = nativeEvent[key];
    if (typeof value === 'function') value = value.bind(nativeEvent);
    syntheticEvent[key] = value;
  }
  syntheticEvent.nativeEvent = nativeEvent;
  syntheticEvent.isPropagationStopped = false;//当前的是否已经阻止冒泡了
  syntheticEvent.stopPropagation = stopPropagation.bind(null, syntheticEvent);//调用此方法可以阻止冒泡
  syntheticEvent.defaultPrevented = false;//当前的是否已经阻止冒泡了
  syntheticEvent.preventDefault = preventDefault.bind(null, syntheticEvent);//调用此方法可以阻止冒泡
  return syntheticEvent;
}

function preventDefault(syntheticEvent: any) {
  const event = syntheticEvent.nativeEvent;
  if (event.preventDefault) {//标准浏览器
    event.preventDefault();
  } else {//IE
    event.returnValue = false;
  }
  syntheticEvent.defaultPrevented = true;
}

function stopPropagation(syntheticEvent: any) {
  const event = syntheticEvent.nativeEvent;
  if (event.stopPropagation) {//标准浏览器
    event.stopPropagation();
  } else {//IE
    event.cancelBubble = true;
  }
  syntheticEvent.isPropagationStopped = true;
}


/**
 * 1. 在事件执行前后进行一些操作 AOP
 * 2. 处理浏览器兼容性
 * 3. 冒泡与原生事件处理
 * @param dom 绑定事件的真实DOM
 * @param eventType  onclick 绑定时候的属性名
 * @param handler 用户自己编写的事件处理函数 实际的处理函数
 */
export const addEvent = (dom: any, eventType: string, handler: Function) => {
  let store = dom._store || (dom._store = {});
  store[eventType] = handler;
  if (!(document as any)[eventType])
    (document as any)[eventType] = dispatchEvent;
}
