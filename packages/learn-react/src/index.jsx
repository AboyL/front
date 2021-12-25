import React from '../react/mock'
import ReactDom from '../react-dom/mock'

// const App = <div className='app' style={{ color: 'red' }} >
//   <div>div1</div>
//   hhhhh
//   <div>div2</div>
// </div>
const App = <div className='app' style={{ color: 'red' }} >
  <div>div1</div>
  text
  <div>div1</div>
</div>

console.log(App)

ReactDom.render(
  App,
  document.getElementById('root'),
)