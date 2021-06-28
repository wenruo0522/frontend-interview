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

   ```js
   !!a === true //  truly
   !!a === false // falsely
   
   !!0 === false
   !!NaN === false
   !!'' === false
   !!null === false
   !!undefined === false
   !!false === false
   ```

### 5. 原型与原型链

1.  Class 和继承

   ```js
   class Student {
       constructor(name, age) {
           this.name = name
           this.age = age
       }
   
       sayHi() {
           console.log(`name: ${this.name}, age: ${this.age}`)
       }
   }
   
   const baby = new Student('baby', 23)
   console.log(baby.name)  //  baby
   console.log(baby.age) //  23
   baby.sayHi()  //  name: baby, age: 23
   
   //  父类
   class People {
       constructor(name) {
           this.name = name
       }
   
       eat() {
           console.log(`${this.name} eat something`)
       }
   }
   
   //  子类
   class Teacher extends People {
       constructor(name, subject) {
           super(name)
           this.subject = subject
       }
   
       teach() {
           console.log(`${this.name} teach ${this.subject}`)
       }
   }
   
   const MissYang = new Teacher('Miss Yang', 'physics')
   console.log(MissYang.name)  //  Miss Yang
   console.log(MissYang.subject)  //  physics
   MissYang.eat()  //  Miss Yang eat something
   MissYang.teach()  //  Miss Yang teach physics
   
   // 子类
   class Staff extends People {
       constructor(name, gender) {
           super(name)
           this.gender = gender
       }
   
       basic() {
           console.log(`name: ${this.name}, gender: ${this.gender}`)
       }
   }
   
   const roomCleaner = new Staff('bob', 'male')
   console.log(roomCleaner.name)   //  bob
   console.log(roomCleaner.gender)  //  male
   roomCleaner.eat()  //  bob eat something
   roomCleaner.basic()  //  name: bob, gender: male
   ```

2. 类型判断 instanceof

   ```js
   [] instanceof Array  //  true
   [] instanceof Object  //  true
   ({}) instanceof Object  //  true
   ```

3. 原型与原型链

   ```js
   roomCleaner.__proto__ === Staff.prototype  // true
   Staff.prototype.__proto__ === People.prototype  //  true
   People.prototype.__proto__ === Object.prototype  //  true
   ```

- 每个 class 都由显式原型 ```prototype```
- 每个实例都由隐式原型 ```__proto__```
- 实例的隐式原型指向 class 的显式原型

4. 利用 class 简单实现 jQuery，并考虑插件与扩展性

   ```js
   class jQuery {
       constructor(selector) {
           const selectors = document.querySelectorAll(selector)
           const length = selectors.length
   
           for (let i = 0; i < length; i++) {
               this[i] = selectors[i]
           }
           this.length = length
           this.selectors = selectors
       }
   
       get(index) {
           return this[index]
       }
       each(fn) {
           for (let i = 0; i < this.length; i++) {
               const elem = this[i]
               fn(elem)
           }
       }
       on(type, fn) {
           return this.each(elem => {
               elem.addEventListener(type, fn, false)
           })
       }
   }
   
   //  插件
   jQuery.prototype.dialog = function(info) {
       alert(info)
   }
   
   //  扩展
   class myJquery extends jQuery {
       constructor(selector) {
           super(selector)
       }
       // 扩展方法
       addClass() {
           //  ...
       }
   }
   ```

### 6. 作用域和闭包

1. 作用域

- 全局作用域
- 函数作用域
- 块级作用域

```js
for (let i = 0; i < 10; i++) {
    let a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e) {
        e.preventDefault()
        console.log(i)
    })
    document.body.appendChild(a)
}
```

2. 自由变量

- 一个变量在当前作用域没有定于，但被使用了
- 向上级作用域逐层寻找，直到找到为止
- 如果到全局作用域都没有找到，则报错 xx is not defined

3. 闭包

- 函数作为参数被传递
- 函数作为返回值被返回

```js
//  函数作为返回值
function create() {
    const a = 100
    return function() {
        console.log(a)
    }
}

const fn = create()
const a = 200
fn()  //  100


//  函数作为参数被传递
function print(fn) {
    let b = 200
    fn()
}

const b = 100
function fnB() {
    console.log(b)
}

print(fnB)  //  100
```

4. this

- 作为普通函数
- 使用 call apply bind
- 作为对象方法被调用
- 在 class 方法中被调用
- 箭头函数
- 执行上下文

5. 手写 bind 函数

```js
//  模拟 bind 函数
Function.prototype.bind1 = function() {
    //  将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)
    //  获取 this
    const that = args.shift()
    //  fn1.bind(...) 中的 fn1
    const self = this
    //  返回一个函数
    return function() {
        return self.apply(that, args)
    }
}

function fn1(a, b, c) {
    console.log('this', this)
    console.log(a, b, c)
    return 'this is fn1'
}

const fn2 = fn1.bind1({x: 100}, 10, 20, 30)  //  this { x: 100 }  10 20 30
const res = fn2()
console.log(res)  //  this is fn1
```

6. 闭包的应用，缓存示例

```js
//  闭包可以隐藏数据，只提供 API
function createCache() {
    const data = {}
    return {
        set(key, value) {
            data[key] = value
        },
        get(key) {
            return data[key]
        }
    }
}

const c = createCache()
c.set('a', 100)
console.log(c.get('a')) //  100
```

### 7. 同步与异步

1.  js 是单线程语言，js 和 DOM 渲染共用一个线程
2.  浏览器和 Node.js 支持 js 启动进程，比如 Web Worker
3.  异步不会阻塞代码执行
4.  同步会阻塞代码执行

```js
//  同步
console.log(100)
alert(200)
console.log(300)
```

```js
// 异步
console.log(100)
setTimeout(() => {
    console.log(200)
}, 1000)
console.log(300)  //  100  300  200
```

