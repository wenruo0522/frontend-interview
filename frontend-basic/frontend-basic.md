## 一、Ajax - Fetch - Axios

- Ajax: 异步请求的一种技术统称, `XMLHttpRequest`

- Fetch: 浏览器原生 `API`, 支持 `Promise`

- Axios: 第三方请求库

- 用 `XMLHttpRequest` 实现 `Ajax`

```js
function ajax1(url, successFn) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, false)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                successFn(xhr.responseText)
            }
        }
    }
    xhr.send(null)
}

function ajax2(url) {
    return fetch(url).then(res => res.json())
}
```

## 二、防抖与节流

```js
function debounce(fn, delay = 200) {
    let timer = null
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

function throttle(fn, delay = 100) {
    let timer = null
    return function() {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
```

## 三、箭头函数

- 没有 `arguments`

- 无法通过 `apply` `call` `bind` 改变 `this`

``` js
// 对象中的方法不适用
const obj = {
    name: "young",
    getName: () => {
        return this.name
    }
}
console.log(obj.getName()) // 无法获取到

// 对象中的原型方法不适用
const obj = {
    name: "young"
}

obj.__proto__.getName = () => {
    return this.name
}
console.log(obj.getName())

// 构造函数不适用
const Foo = (name, age) => {
    this.name = name
    this.age = age
}
const f = new Foo("young", 18)

// 动态上下文中的回调函数不适用
const btn = document.getElementById("btn")
btn.addEventListener("click", () => {
    this.innerHTML = "clicked"
})

// Vue 声明周期和 method 不适用 -> Vue 组件本质上是 js 对象
// React 适用 -> React 组件本质上是 class
```

## 四、迭代函数

```js
const arr = [10, 20,30]
for (const key in arr) {
    console.log(key) // 0,1,2
}

for (const val of arr) {
    console.log(val) // 10,20,30
}

// 遍历对象: for...in 可以，for...of 不可以
// 遍历 Map Set: for...of 可以， for...in 不可以
// 遍历 generator: for...of 可以， for...in 不可以
// for...in 是用于可枚举数据，如对象，数组，字符串
// for...of 用于可迭代数据，如数组，字符串，Map,Set -> 可迭代协议 Symbol.iterator

// for await...of 用于遍历多个 Promise
function createPromise(val) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(val)
        }, 1000)
    })
}

(async function() {
    const p1 = createPromise(100)
    const p2 = createPromise(200)
    const p3 = createPromise(300)
    const res1 = await p1
    const res2 = await p2
    const res3 = await p3
    
    const list = [p1, p2, p3]
    Promise.all(list).then(res => {
        console.log(res)
    })
    
    for await (const res of list) {
        console.log(res)
    }
})()

const arr = [10, 20, 30]
for (const num of arr) {
    const res = await createPromise(num)
    console.log(res)
}
```

## 五、computed && watch

- `computed` 用于计算产生新的数据，有缓存
- `watch` 用于监听现有数据

## 六、Vue 组件通讯

- `props` 和 `$emit` - 父子组件通讯
- 自定义事件 - 通过事件的发布订阅模式，利用事件总线机制
- `$attrs`
- `$parent`
- `$refs`
- `provide` 和 `inject` - 跨级同源组件
- Vuex
  - mutation: 原子操作，必须同步代码
  - action: 可以包含多个 mutation，可以包含异步代码
  - vue 辅助工具要追踪数据的先后提交次序（数据流），用异步提交来保障数据的可追踪性

## 七、严格模式

- 全局变量必须先声明
- 禁止使用 `with`
- 创建 `eval` 作用域
- 禁止 `this` 指向 `window`
- 函数参数不能重名

## 八、跨域

- 浏览器同源策略
- 同源策略一般限制 `Ajax` 网络请求，不能跨域请求 `server`
- 不会限制 `<link>` `<img>` `<script>` `<iframe>` 加载第三方资源
- 使用代理服务器，服务端没有跨域限制
- `JSONP` `CORS` 
- 跨域之前 `options` 请求，浏览器自行发起的预检查，会返回 `Access-Control-Allow-Methods` 字段，表明服务端支持的跨域方法

