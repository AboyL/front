export default {}
enum Color {
  Red = 1,
  Green,
  Blue
}

let col: Color = Color.Red;
col = 5; // 有效的，这也是 Color.Red
console.log(col)
enum Color2 {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}
let col2 = Color2.Red;
// col2 = 'red'; // 有效的，这也是 Color.Red
