// import React, { Component, createRef } from 'react';
// import ReactDOM from 'react-dom';

import React, { Component, createRef, forwardRef } from '../react'
import * as ReactDOM from '../react-dom'


class TextField extends Component {
  inputText = null
  constructor() {
    super()
    this.inputText = createRef()
  }
  handleGetFocus = () => {
    this.inputText.current.focus()
  }

  consoleTest = () => {
    console.log('test')
  }
  render () {
    return (
      <div>
        <input type="text" ref={this.inputText} />
      </div>
    )
  }
}

class Comp extends Component {
  inputText = null
  constructor() {
    super()
    this.textFieldRef = createRef()
  }
  handleGetFocus = () => {
    this.textFieldRef.current.handleGetFocus()
    this.textFieldRef.current.consoleTest()
  }
  render () {
    return (
      <div>
        <button onClick={this.handleGetFocus} >获取焦点</button>
        <TextField ref={this.textFieldRef} />
      </div>
    )
  }
}
const CompFunc = () => {
  const inputTextRef = createRef()
  const handleGetFocus = () => {
    inputTextRef.current.focus()
  }

  return (
    <div>
      <button onClick={handleGetFocus} >获取焦点</button>
      <input type="text" ref={inputTextRef} />
    </div>
  )
}



// 函数组件 forwardRef
function TextInput (props, ref) {
  return <input ref={ref} />
}

const ForwardedTextInput = forwardRef(TextInput);

/**
ForwardedTextInput={
  $$typeof: Symbol(react.forward_ref)
  render: ƒ TextInput(props, forwardRef)
}
 */
class Form extends React.Component {
  constructor() {
    super();
    this.textInputRef = React.createRef();
  }
  getFocus = () => {
    //this.textInputRef.current=input的真实DOM
    this.textInputRef.current.focus();
  }
  render () {
    console.log('xxxx')
    let element = <ForwardedTextInput ref={this.textInputRef} />;

    return (
      <div>
        {element}
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}

let element = <Form />;

ReactDOM.render(
  element,
  // <Comp />,
  // <CompFunc />,
  document.getElementById('root')
);