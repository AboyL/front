import Updater from "./Updater"
import { findDOM, compareTwoVdom } from '../react-dom/utils'

abstract class Component {
  static isReactComponent = true
  props: any
  updater: Updater
  oldRenderVdom: any
  constructor(props: any) {
    this.props = props
    this.updater = new Updater(this)
  }

  setState(partialState: any, callback?: Function) {
    this.updater.addState(partialState, callback);
  }

  // 应该返回一个vdom
  abstract render(): any

  //让类组件强行更新 
  forceUpdate() {
    //获取此组件上一次render渲染出来的虚拟DOM
    let oldRenderVdom = this.oldRenderVdom;
    //获取虚拟DOM对应的真实DOM oldRenderVdom.dom
    let oldDOM = findDOM(oldRenderVdom);
    //重新执行render得到新的虚拟DOM
    let newRenderVdom = this.render();
    //把老的虚拟DOM和新的虚拟DOM进行对比，得对比得到的差异更新到真实DOM
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}

export default Component