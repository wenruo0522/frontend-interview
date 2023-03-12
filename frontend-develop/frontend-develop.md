## 一、内存管理

- 垃圾回收

```js
// 运行结束立即回收
function fn1() {
    const a = "a"
    const obj = {
        x: 100
    }
}

// 运行结束之后无法回收，已经被挂载到全局变量上
function fn2() {
    const obj = {
        x: 100
    }
    window.obj = obj
}

// 闭包，无法进行垃圾回收，但是该行为符合预期，不算内存泄漏
function getDataFns() {
    const data = {}
    return {
        get(key) {
            return data[key]
        },
        
        set(key, value) {
            data[key] = value
        }
    }
}

const { get, set } = getDataFns()
set("x", 100)
get("x")

// 引用计数（之前使用的），循环引用会导致引用计数失效
let a = { x: 100 }  // 引用计数：1
let a1 = a  // 引用计数：2
a = 10  // 引用计数：1
a1 = null // 引用计数：0 完成垃圾回收

// 标记清除（现在）
```

- 内存泄露
  - 被全局变量、函数引用，组件销毁时未清除
  - 被全局事件、定时器引用，组件销毁时未清除
  - 被自定义事件引用，组件销毁时未清除

## 二、Event Loop

- JS 是单线程的
- 浏览器中 JS 执行和 DOM 渲染共用一个线程
- 异步 - 微任务：`promise` `async/await` 
- 异步 - 宏任务：`setTimeout` `setInterval`
- 微任务在下一轮 DOM 渲染之前执行，宏任务在之后执行

```js
console.log("start") // 1
setTimeout(() => {
    console.log("timeout") // 4
})
Promise.resolve().then(() => {
    console.log("promise then") // 3
})
console.log("end")  // 2
```

- 浏览器的 `Event Loop` 同步任务先执行，遇到异步任务推进 `callback Queue` 中，宏任务与微任务会进入到不同的队列中。等到同步任务完成之后，通过 `Event Loop` 机制，将异步任务从队列中取出来，逐步执行，需要注意的是宏任务与微任务的执行顺序

- Nodejs 中的宏任务和微任务，分不同的类型，有不同的优先级

```js
// nodejs 环境中的执行顺序
console.info("start") // 1
setImmediate(() => {
    console.info("setImmediate")  // 6
})
setTimeout(() => {
    console.info("timeout")  // 5
})
Promise.resolve().then(() => {
    console.info("promise then") // 4
})
process.nextTick(() => {
    console.log("nextTick") // 3
})
console.info("end")  // 2
```

- nodejs 中宏任务的优先级
  - Timers - setTimeout setInterval
  - I/O callbacks - 处理网络、流、TCP 的错误回调
  - Idle prepare - 闲置状态（nodejs 内部使用）
  - Poll 轮询 - 执行 poll 中的 I/O 队列
  - Check 检查 - 存储 setTmmediate 回调
  - Close callbacks - 关闭回调，比如 `socket.on("close")`

- nodejs 微任务类型和优先级
  - `promise` `async/await` `process.nextTick`
  - `process.nextTick` 优先级最高

## 三、多进程与进程通讯

- 进程，OS 进行资源分配和调度的最小单位，有独立内存空间
- 线程，OS 进行运算调度的最小单位，共享进程内存空间
- JS 是单线程的，但是可以开启多进程执行，比如 WebWorker

```js
// --- compute.js ---
function getSum() {
    let sum = 0
    for (let i = 0; i < 10000; i++) {
        sum += i
    }
    return sum
}

process.on("message", data => {
    console.info("child process id", process.pid)
    console.info("child process get message", data)
    const sum = getSum()
    process.send(sum)
})
// --- compute.js ---

// --- cluster.js ---
const http = require("http")
const cpuCoreLength = require("os").cpus().length
const cluster = require("cluster")

if (cluster.isMaster) {
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork()
    }
    
    cluster.on("exit", worker => {
        console.info("child process quit")
        cluster.fork() // 进程守护
    })
} else {
   const server = http.createServer((req, res) => {
       res.writeHead(200)
       res.end("done")
   }) 
   server.listen(3000)
}
// --- cluster.js ---

const http = require("http")
const fork = require("child_process").fork
const server = http.createServer((req, res) => {
    if (req.url === "/get-sum") {
        console.info("main process id", process.pid)
        
        const computeProcess = fork("./compute.js")
        computeProcess.send("compute")
        computeProcess.on("message", data => {
            console.log("main process get message", data)
            res.end(data)
        })
        computeProcess.on("close", () => {
            console.info("child process error")
            computeProcess.kill()
            res.end("error")
        })
    }
})
server.listen(3000, () => {
    console.info("localhost:3000")
})
```

## 四、Vue 生命周期

- beforeCreate
  - 创建一个空白的 `Vue` 实例
  - `data` `method` 尚未被初始化，不可使用
- created
  - `Vue` 实例初始化完成，完成响应式绑定
  - `data` `method` 都已经初始化完成，可调用
  - 尚未开始渲染模板
- beforeMount
  - 编译模板，调用 `render` 生成 `vdom`
  - 还没有开始渲染 DOM
- mounted
  - 完成 DOM 渲染
  - 组件创建完成
  - 开始由 “创建阶段” 进入 “运行阶段”

- beforeUpdate
  - `data` 发生变化之后
  - 准备更新 DOM（尚未更新DOM）
- updated
  - `data` 发生变化，且 DOM 更新完成
  - 不要在该生命周期中修改 `data`，可能会导致死循环
- beforeUnmount
  - 组件进入销毁阶段（尚未销毁，可以正常使用）
  - 可以移除，解绑一些全局事件和自定义事件
- unmounted
  - 组件被销毁
  - 所有子组件也被销毁
- keep-alive 组件额外的生命周期
  - onActivated 缓存组件被激活
  - onDeactivated 缓存组件被隐藏

- Vue 在什么时候操作 DOM 比较合适

  - mounted 和 updated 都不能保证子组件全部挂载完成
  - 使用 `$nestTick` 渲染 DOM

  ```js
  mounted() {
      this.$nextTick(function() {})
  }
  ```

- Vue3 Composition API 生命周期有什么区别

  - 用 `setup` 代替了 `beforeCreate` 和 `created`
  - 使用 `Hooks` 函数的形式，比如 `mounted` 改完 `onMounted()`

  ```js
  import { onUpdated, onMounted } from "vue"
  
  export default {
      setup() {
          onMounted(() => {
              console.info("mounted")
          })
          
          onUpdated(() => {
              console.info("updated")
          })
      }
  }
  ```

## 五、diff 算法

- 只比较同一个层级，不跨级比较
- `tag` 不同则删除重建（不再去比较内部细节）
- 子节点通过 `key` 区分
- React - 仅右移
- Vue2 - 双端比较
- Vue3 - 最长递增子序列，找到新旧节点相同的序列，然后再进行双端比较

## 六、MemoryHistory

- Vue - router 三种模式
  - Hash
  - WebHistory
  - MemoryHistory
