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

//  example-1
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})  // 1 3

//  example-2
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('err')
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})  //  1  2  3

//  example-3
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('err')
}).catch(() => {
    console.log(2)
}).catch(() => {
    console.log(3)
})  //  1  2 
```

### 3. async/await

- 语法介绍
- 和 Promise 的关系
- 异步本质
- for ... of

#### 3.1 语法介绍

用同步的方式来编写异步代码

```js
function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.src = src
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            const err = new Error('failed load image')
            reject(err)
        }
    })
}

async function loadImg1() {
    const src1 = 'http://www.imooc.com/static/img/index/logo_new.png'
    const img = await loadImg(src1)
    return img1
}

async function loadImg2() {
    const src2 = 'https://avatars3.githubusercontent.com/u/9583120'
    const img = await loadImg(src2)
    return img2
}

(async function() {
    //  注意：await 必须放在 async 函数中，否则会报错
    try {
        const img1 = await loadImg1()
        console.log(img1)
        const img2 = awiat loadImg2()
        console.log(img2)
    } catch (err) {
        console.log(err)
    }
})()
```

#### 3.2 async/await 与 Promise

- 执行 async 函数，返回的是 Promise 对象

  ```js
  async function fn1() {
      return 100  //  相当于 return Promise.resolve(100)
  }
  const result = fn1() // result 为 Promise 并且是 fulfilled 状态
  result.then(data => {
      console.log(data) //  100
  })
  ```

- await 相当于 Promise 中的 then

  await 后面跟 Promise 对象：会阻断后续代码，等状态变为 resolved，才获取结果并继续执行

  await 后面跟着非 Promise 对象：则直接返回该对象

  ```js
  (async function() {
      const p1 = new Promise(() => {})
      await p1
      console.log('p1')  // 没有打印，无法执行
  })()
  
  (async function() {
      const p2 = Promise.resolve(100)
      const res = await p2
      console.log(res) // 100
  })()
  
  (async function() {
      const res = await 100
      console.log(res) // 100
  })()
  
  (async function() {
      const p3 = Promise.reject('some err')
      const res = await p3
      console.log(res) // 没有打印，无法执行
  })()
  ```

- try ... catch 可以捕获异常，代替了 Promise 中的 catch

  ```js
  (astnc function() {
      const p4 = Promise.reject('err')
      try {
          const res = await p4
          console.log(res)
      } catch (err) {
          console.log(err)
      }
  })()
  ```

#### 3.3 异步本质

- await 是同步语法，本质还是异步调用

  ```js
  async function async1() {
      console.log('async1 start') // 2
      await async2()
      console.log('async1 end') //  5
  }
  
  async function async2() {
      console.log('async2')  //  3
  }
  
  console.log('script start')  // 1
  async1() 
  console.log('script end')  // 4
  ```

#### 3.4 for...of

```js
//  定时计算乘法
function multi(num) {
	return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * num)
        }, 1000)
    })
}
const nums = [1, 4, 9]
(async function() {
    nums.forEach(async (i) => {
    const res = await multi(i)
    console.log(res)
	}) //  使用 forEach ，是 1s 之后打印出所有结果，即 3 个值是一起被计算出来的
})()

(async function() {
    for (let i of nums) {
        const res = await multi(i)
        console.log(res)
    }
})()  //  使用 for...of ，可以让计算挨个串行执行
```

### 4. 微任务和宏任务

- 宏任务：setTimeout setInterval DOM 事件
- 微任务：Promise async/await
- 微任务比宏任务执行的更早

```js
console.log(100)
setTimeout(() => {
    console.log(200)
})
Promise.resolve().then(() => {
    console.log(300)
})
console.log(400)
//  100 400 300 200
```

#### 4.1 event loop 和 DOM 渲染

- 每一次 call stack 结束，都会触发 DOM 渲染
- 然后进行 event loop

```js
const $p1 = $('<p>一段文字</p>')
const $p2 = $('<p>一段文字</p>')
const $p3 = $('<p>一段文字</p>')
$('#container').append($p1).append($p2).append($p3)

console.log($('#containeer').children().length)  //  3
alert('本次 call stack 结束，DOM 结构已更新，但尚未触发渲染')
// （alert 会阻断 js 执行，也会阻断 DOM 渲染，便于查看效果）
```



#### 4.2 宏任务和微任务的区别

