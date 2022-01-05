// import React, { Component } from 'react'
// import ReactDom from 'react-dom'

import React, { Component } from '../react'
import * as ReactDom from '../react-dom'
import { updateQueue } from '../react/Updater';

// const App = <div className='app' style={{ color: 'red' }} >
//   <div>div1</div>
//   hhhhh
//   <div>div2</div>
// </div>
class ClassComponent extends Component {
  state = {
    number: 0
  }
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  handleClick2 = () => {
    this.setState((pre) => ({ number: pre.number + 1 }));
    console.log(this.state.number)// 0
    this.setState((pre) => ({ number: pre.number + 1 }));
    console.log(this.state.number)// 0
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number)// 3
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number)// 4
    });
  }
  handleClick = (event) => {
    // 阻止冒泡
    event.stopPropagation()
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number)// 0
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number)// 0
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number)// 2
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number)// 3
    });
  }
  handleDivClick = () => {
    console.log('handleDivClick')

  }
  render () {
    const { number } = this.state
    const { children } = this.props

    return (
      <div onClick={this.handleDivClick} className='app' style={{ color: 'red' }} >
        <button onClick={this.handleClick}>点我增加 {number}</button>
        {/* <div>{children}</div> */}
      </div>
    )
  }
}

const FunctionComponent = ({ name, children }) => {
  return (
    <div className='app' style={{ color: 'red' }} >
      <div>div1</div>
      {name}+{children}
      <div>div1</div>
    </div>
  )
}
// const App = <FunctionComponent name="name---">
//   xxx
// </FunctionComponent>

const App = <ClassComponent name="name---">
  xxx
</ClassComponent>


ReactDom.render(
  App,
  document.getElementById('root'),
)