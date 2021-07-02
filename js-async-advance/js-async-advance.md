## js-async-advance

### 1. event loop

1.  js 是单线程运行
2.  异步要基于回调来实现的
3.  event-loop 是异步回调的实现原理
4.  首先，同步代码先推入 Call Stack 中执行
5.  遇到定时或者网络请求的异步任务，会先注册该任务
6.  异步任务等待的时间到了，异步任务就会被移动到 Callback Queue 中
7.  当同步代码全部执行完毕，也就是 Call Stack 为空之后，Event Loop 开始工作
8.  Event Loop 会轮询查找 Callback Queue，如果其中有任务则移动到 Call Stack 中执行
9.  Event Loop 重复执行轮询查找

```js
console.log('Hi')

setTimeout(function cb() {
    console.log('cb')    // callback function
}, 5000)

console.log('Bye')  //  打印顺序： Hi  Bye  cb
```

```html
<button id="btn">commit</button>

<script>
    console.log('Hi')
    
    $('#btn').click(function(e) {
        console.log('button clicked')
    })
    
    console.log('Bye')
</script>
```

### 2. promise 进阶

- 三种状态
- 状态变更
- then 和 catch
- 常用 API

#### 2.1 三种状态

- 三种状态：pending  fulfilled rejected
- pending 状态变成 fulfilled 或者  pending 状态变成 rejected
- 以上两种状态变化不可逆

```js
// 刚定义时，状态默认为 pending
const status1 = new Promise((resolve, reject) => {
    //  Todo
})

// 执行 resolve() 后，状态变成了 fulfilled 
const status2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    })
})

// 执行 reject() 后，状态变成 rejected
const status3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject()
    })
})
```

```js
//  直接返回一个 fulfilled  状态
Promise.resolve(100)

//  直接返回一个 rejected 状态
Promise.reject('some error')
```

- pending 不会触发任何 then/catch 回调
- 状态变为 fulfilled 会触发后续的 then 回调
- 状态变为 rejected 会触发后续的 catch 回调

- 在 then/catch 后继续返回 Promise，此时可能会发生状态变化

```js
// then() 一般正常返回 fulfilled 状态的 promise
Promise.resolve().then(() => {
    return 100
})

//  then() 之后抛出错误，会返回 rejected 状态的 promise
Promise.resolve().then(() => {
    throw new Error('err')
})

//  catch() 不抛出错误，会返回 fulfilled 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
})

// catch() 抛出错误，会返回 rejected 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some err')
    throw new Error('err')
})
```



### 3. async/await





### 4. 微任务和宏任务



