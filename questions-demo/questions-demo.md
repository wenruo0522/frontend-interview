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

### 4. 闭包

```js
// 自由变量示例 ———— 内存会被释放
let a = 0
function fn1() {
    let a1 = 100
    
    function fn2() {
        let a2 = 200
        
        function fn3() {
            let a3 = 300
            return a + a1 + a2 + a3
        }
        fn3()
    }
    fn2()
}
fn1()

//  闭包：函数作为返回值 ———— 内存不会被释放
function create() {
    let a = 100
    return function() {
        console.log(a)
    }
}
let fn = create()
let a = 200
fn() // 100

function print(fn) {
    let a = 200
    fn()
}
let a = 100
function fn() {
    console.log(a)
}
print(fn)  // 100
```

### 5. 函数声明与函数表达式

- 函数声明会在代码执行前预加载，而函数表达式不会

```js
// 函数声明
const res = sum(10, 20)
console.log(res)  // 30
function sum(x, y) {
    return x + y
}

// 函数表达式
const res = sum(10, 20)
console.log(res)  // ReferenceError
const sum = function(x, y) {
    return x + y
}
```

### 6. object 

- Object.create(null) 创建出来的对象没有原型
- new Object() 等价与 {}

### 7. 正则表达式

```js
// 邮政编码
/\d{6}/

// 小写英文字母
/^[a-z]+$/
    
// 英文字母
/^[a-zA-Z]+$/

// 日期格式 2019-12-1
/^\d{4}-\d{1,2}-\d{1,2}$/
    
// 用户名:字母开头，后面字母数字下划线，长度6-18
/^[a-zA-Z]\w{5,17}$/

// 简单的IP地址匹配
/\d+\.\d+\.\d+\.\d+/
```

### 8. examples

```js
// 手写字符串 trim 方法，保证浏览器兼容性
String.prototype.trim = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '')
}

// 获取多个数字中的最大值
function max() {
    const nums = Array.prototype.slice.call(arguments) // 类数组转为数组
    let max = nums[0]
    nums.forEach(n => {
        if (n > max) {
            max = n
        }
    })
    return max
}
```

### 9. URLSearchParams

```js
// 传统方式
function query(name) {
    const search = location.search.substr(1)  // 去除查询字符串中的‘？’
    // search = 'a=10&b=20&c=30' 
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const res = search.match(reg)
    if (res === null) {
        return null
    }
    return res[2]
}
query('d')

// URLSearchParams
function query(name) {
    const search = location.search
    const p = new URLSearchParams(search)
    return p.get(name)
}
console.log(query('b'))
```

### 10. flat

```js
// [1, 2, 3, [4, 5]] -> [1, 2, 3, 4, 5]
function flat(arr) {
    // 验证数组元素中是否有数组
    const isDeep = arr.some(item => item instanceof Array)
    if (!isDeep) {
        return arr
    }
    
    const res = Array.prototype.concat.apply([], arr)
    return flat(res)
}
```

### 11. 数组去重

```js
function unique(arr) {
    const res = []
    arr.forEach(item => {
        if (res.indexOf(item) < 0) {
            res.push(item)
        }
    })
    return res
}

// use set
function unique(arr) {
    const set = new Set(arr)
    return [...set]
}
```

### 12. requestAnimationFrame

- 动画流畅，更新频率需要 60f/s。即 16.67ms 更新一次视图
- setTimeout 需要手动控制频率，而RAF由浏览器自动控制
- 浏览器标签隐藏了，或者iframe隐藏了，RAF会暂停，setTimeout依然执行 

```js
// 3s 宽度从 100px 变为 640px，增加 540px
// 60f/s 3s 180frames 每一帧变化 3px

const $div1 = $('#div1')
let curWidth = 100
const maxWidth = 640

// setTimeout
function animate() {
    curWidth = curWidth + 3
    $div1.css('width', curWidth)
    if (curWidth < maxWidth) {
        setTimeout(animate, 16.7)
    }
}
animate()

// RAF
function animate() {
    curWidth = curWidth + 3
    $div1.css('width', curWidth)
    if (curWidth < maxWidth) {
        window.requestAnimationFrame(animate)
    }
}

animate()
```

