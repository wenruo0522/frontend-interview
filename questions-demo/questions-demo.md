## Questions-demo

### 1. 变量

```js
// 变量提升
console.log(a)  //  undefined
var a = 200

var a
console.log(a)  //  undefined 
a = 200

// 块级作用域
for (let i = 0; i < 10; i++) {
    let j = i + 1
}
console.log(j)
```

### 2. 对象的深度比较 

```js
// 判断是否是对象或数组
function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
// 深度相等
function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        // 值类型
        return obj1 === obj2
    }
    if (obj1 === obj2) {
        return true
    }
    
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    if (obj1Keys.length !== obj2Keys.length) {
        return false
    }
    
    for (let key in obj1) {
        const res = isEqual(obj1[key], obj2[key])
        if (!res) {
            return false
        }
    }
    return true
}

// 测试
const obj1 = {
    a: 100,
    b: {
        x: 100,
        y: 200
    }
}
const obj2 = {
    a: 100,
    b: {
        x: 100,
        y: 200
    }
}

console.log(isEqual(obj1, obj2))
```

### 3. 数组相关API

- 数组中的纯函数，在不改变原数组的情况下，返回一个新数组。

```js
// 测试数组，以下api均测试一次
const arr = [10, 20, 30, 40]

// pop
const popRes = arr.pop()
console.log(popRes, arr) // 40  [10, 20 ,30]

// push
const pushRes = arr.push(50) // 返回数组长度
console.log(pushRes, arr) // 5  [10, 20, 30, 40, 50]

// unshift
const unshiftRes = arr.unshift(6) // 返回数组长度
console.log(unshiftRes, arr) // 5  [6, 10, 20, 30, 40]

// shift
const shiftRes = arr.shift()
console.log(shiftRes, arr)  // 10  [20, 30, 40]


// 纯函数

// concat
const arr1 = arr.concat([50, 60, 70])
console.log(arr, arr1) // [10, 20, 30, 40]  [10, 20, 30, 40, 50, 60, 70]

// map
const arr1 = arr.map(num => num * 10)
console.log(arr, arr1) // [10, 20, 30, 40]  [100, 200, 300, 400]

// filter
const arr1 = arr.filter(num => num > 25)
console.log(arr, arr1) // [10, 20, 30, 40]  [30, 40]

// slice
const arr1 = arr.slice()
console.log(arr, arr1) // [10, 20, 30, 40]  [10, 20, 30, 40]

// 非纯函数  push/pop/shift/unshift/forEach/some/every/reduce
```

```js
// slice and splice

const arr = [10, 20, 30, 40, 50]

const arr1 = arr.slice()  // [10, 20, 30, 40, 50]
const arr2 = arr.slice(1, 4)  // [20, 30, 40]
const arr3 = arr.slice(2)  //  [30, 40, 50]
const arr4 = arr.slice(-2) // [40, 50]

// splice 非纯函数
const spliceRes = arr.splice(1, 2, 'a', 'b', 'c')
console.log(spliceRes, arr) // [20, 30]  [10, 'a', 'b', 'c', 40, 50]

[10, 20, 30].map(parseInt)
// [10, 20, 30].map((num, index) => { return parseInt(num, index) })
// [10, NaN, NaN] 
```

