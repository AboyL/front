a()
function a () {
  console.log('a')
}
// b()
const b = function () {
  console.log('b')
}
b()

function factorial (num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

var anotherFactorial = factorial;
factorial = null;
// console.log(anotherFactorial(4))//出错！

let factorial2 = function fn (num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * fn(num - 1);
  }
}

var anotherFactorial2 = factorial2;
factorial2 = null;
console.log(anotherFactorial2(4))//出错！

let factorial3 = function fn (num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * fn(num - 3);
  }
}

var anotherFactorial3 = factorial3;
console.log(anotherFactorial3(4))//出错！