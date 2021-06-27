
//  基本类型
let a
const str = 'abc'
const n = 100
const b = true
const s = Symbol('s')

console.log(typeof a)   //  undefined
console.log(typeof str)  //  string
console.log(typeof n)  //  number
console.log(typeof b)  //  boolean
console.log(typeof s)  //  symbol

//  判断函数
console.log(console.log)   //  [Function: log]
console.log(function() {})  //  [Function (anonymous)]

//  判断引用类型
console.log(typeof null)    //  object
console.log(typeof ['a', 'b'])  //  object
console.log(typeof { x: 100 })  // object
