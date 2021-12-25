// import React, { Component } from 'react'
// import ReactDom from 'react-dom'

import React, { Component } from '../react'
import * as ReactDom from '../react-dom'
console.log(React)
console.log(Component)

// const App = <div className='app' style={{ color: 'red' }} >
//   <div>div1</div>
//   hhhhh
//   <div>div2</div>
// </div>
class ClassComponent extends Component {
  render () {
    const { name, children } = this.props
    return (
      <div className='app' style={{ color: 'red' }} >
        <div>class top</div>
        {name}+{children}
        <div>class bottom</div>
      </div>
    )
  }
}
console.log(ClassComponent)
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

console.log(App)

ReactDom.render(
  App,
  document.getElementById('root'),
)