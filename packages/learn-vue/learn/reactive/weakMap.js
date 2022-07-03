const map = new Map();
const weakmap = new WeakMap();

(function () {
  const foo = { a: 1 }
  const bar = { b: 1 }
  map.set(foo, 1)
  weakmap.set(bar, 1)
console.log('weakmap.size',weakmap.get(bar))

}());

console.log(map.size)
console.log(weakmap.size) // undefined 无size
