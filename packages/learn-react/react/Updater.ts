export let updateQueue = {
  isBatchingUpdate: false,//更新队列中有一个标识,是否要执行批量更新
  updaters: new Set<any>(),//updater实例的集合
  batchUpdate() {
    for (let updater of updateQueue.updaters) {
      updater.updateComponent();
    }
    //重置 为false
    updateQueue.isBatchingUpdate = false;
    //清空updater集合
    updateQueue.updaters.clear();
  }
}

function shouldUpdate(classInstance: any, nextState: any) {
  //默认是要更新的
  let willUpdate = true;
  //如果有方法，并且此方法返回了false,那就不更新，如果没有此方法，或者返回了true就要继续向下更新组件
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(null, nextState)) {
    willUpdate = false;
  }
  //组件将要更新 
  if (willUpdate && classInstance.componentWillUpdate) {
    classInstance.componentWillUpdate();
  }
  //不管要不要更新，都要把最新的状态赋给classInstance.state
  classInstance.state = nextState;
  //如果要更新，才会走组件的更新方法
  if (willUpdate)
    classInstance.forceUpdate();
}

class Updater {
  pendingStates: any[] = []
  callbacks: Function[] = []
  classInstance: any
  constructor(classInstance: any) {
    //类组件的实例
    this.classInstance = classInstance;
    //等待更新的状态
    this.pendingStates = [];
    //更新后的回调
    this.callbacks = [];
  }
  addState(partialState: any, callback?: Function) {
    this.pendingStates.push(partialState);
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
    //触发更新
    this.emitUpdate();
  }
  emitUpdate() {
    // 根据情况进行更新
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this)
    } else {
      this.updateComponent();
    }
  }

  //返回新状态
  getState() {
    let { classInstance, pendingStates } = this;
    //先获取老状态
    let { state } = classInstance;
    //用老状态合并新状态
    pendingStates.forEach((partialState) => {
      if (typeof partialState === 'function') {
        partialState = partialState(state);
      }
      state = { ...state, ...partialState };
    });
    //清空数组
    pendingStates.length = 0;
    return state;
  }

  // 更新组件
  updateComponent() {
    // 调用render生成新的vdom
    let { classInstance, pendingStates, callbacks } = this;
    //长度大于0说明当前有正在准备要更新的分状态
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState());
    }
    if (callbacks.length > 0) {
      callbacks.forEach(callback => callback());
      callbacks.length = 0;
    }
  }
}
export default Updater