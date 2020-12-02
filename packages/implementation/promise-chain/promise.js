const generatePromise=()=>{
  return Promise.resolve(123)
  .then(undefined)
  .then(res=>{
    console.log(res)
    return 'hello'
  })
  .then(res=>{
    console.log(res)
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve('hhh')
      }, 1000);
    })
  })
}

generatePromise()
.then(res=>{
  console.log(res)
})
