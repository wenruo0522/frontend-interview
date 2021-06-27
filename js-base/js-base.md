## js-base

### 1. 值类型与引用类型

堆栈模型

### 2. typeof 运算符

		1. 识别所有值类型
  		2. 识别函数
  		3. 判断是否是引用类型

```js
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
```

### 3. 深拷贝

```js
/*
* 深拷贝
* */

const who = {
    age: 20,
    name: 'who',
    address: {
        city: 'FuZhou'
    },
    subjects: ['physics', 'math']
}

let copyWho = deepClone(who)
copyWho['age'] = 21

console.log(copyWho['age'])  // 21
console.log(who['age'])  // 20

function deepClone(cloneObj = {}) {
    if (typeof cloneObj !== 'object' || cloneObj == null) {
        return cloneObj
    }

    let result
    if (cloneObj instanceof Array) {
        result = []
    } else {
        result = {}
    }

    for (let key in cloneObj) {
        if (cloneObj.hasOwnProperty(key)) {
            result[key] = deepClone(cloneObj[key])
        }
    }

    return result
}
```

### 4. 类型转换

1. 字符串拼接

```js
const a = 100 + 10  //  110
const b = 100 + '10'  //  '10010'
const c = true + '10'  //  'true10'
```

2. == 和 ===

```js
100 == '100'  // true
0 == '' // true
0 == 'false'  // true
false == ''  // true
null == undefined  // true
```

3. 逻辑运算

``` js
!!a === true //  truly
!!a === false // falsely

!!0 === false
!!NaN === false
!!'' === false
!!null === false
!!undefined === false
!!false === false
```

