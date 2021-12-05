// 泛型函数
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result = createArray<string>(3, 'x');
console.log(result);

function getT<T>(value: T): T {
  return value;
}

getT(1)

// 泛型类
class MyArray<T>{
  private list: T[] = [];
  add(value: T) {
    this.list.push(value);
  }
  getMax(): T {
    let result = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] > result) {
        result = this.list[i];
      }
    }
    return result;
  }
}
let arr = new MyArray<number>();
arr.add(1); arr.add(2); arr.add(3);
let ret = arr.getMax();
console.log(ret);

// 泛型类与new
// 如何得到一个工厂函数 通过这个工厂函数得到返回的类
// function factory(type: MyArray<number>) {
//   return new type();// This expression is not constructable.
// }

function factory<T>(type: { new(): T }): T {
  return new type(); // This expression is not constructable.
}
const myArray = factory<MyArray<number>>(MyArray)

// 泛型接口
// 通过泛型接口可以对函数进行约束 是一个通用的泛型
interface Calculate {
  <T>(a: T, b: T): T
}
// 或者
interface Calculate2<T> {
  (a: T, b: T): T
}

let add: Calculate = function <T>(a: T, b: T) {
  return a;
}
add<number>(1, 2);
let add2: Calculate2<number> = function <T>(a: T, b: T) {
  return a;
}
add2(1, 2);


// 泛型可以有多个 不一定是T
function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]];
}
let swapped = swap<string, number>(['a', 1]);
console.log(swapped);
console.log(swapped[0].toFixed(2));
console.log(swapped[1].length);

// 默认的泛型
function createArray3<T = number>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result2 = createArray3(3, 'x');
console.log(result2);


// 泛型约束
// 在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。

function logger<T>(val: T) {
  // console.log(val.length); //直接访问会报错
}
//可以让泛型继承一个接口
interface LengthWise {
  length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
  console.log(val.length)
}
logger2('zhufeng');
// logger2(1); 没有length