## 一、token & cookie & JWT

- `cookie` 相关
  - HTTP 无状态，每次请求都要带 `cookie`，以帮助识别身份
  - 服务端也可以向客户端 `set-cookie`，`cookie` 大小限制 4kb
  - 默认有跨域限制：不可跨域共享、传递 `cookie`
  - 前端可以设置 `withCredentials` 来跨域传递 `cookie`
  - HTML5 之前 `cookie` 常被用作本地存储
  - HTML5 之后推荐使用 `localStorage` 和 `sessionStorage`
  - 现代浏览器禁止网页引入的第三方 JS 设置 `cookie`

- `session` 相关

  - `cookie` 用于登录验证，存储用户标识（比如 `userId`）
  - `session` 在服务端，存储用户详细信息，和 `cookie` 信息对应
  - `cookie` + `session` 是常见登录验证解决方案
  - 用户利用用户名和密码登录服务端，通过服务端的登录校验之后，存入 `session` 中，同时，将对应的 `cookie` 返回给浏览器端，用户在下一次请求的时候，会带上 `cookie` 访问服务端，此时服务端对比 `cookie` 和 `session` 的关系即可

  ```js
  // 登录：用户名 + 密码
  // set-cookie -> userId: user
  // cookie userId -> user
  // 服务端缓存
  const session = {
      user: {
          username: "name",
          phone: "134XXXXXXXX"
          email: "XXXXXXX@qq.com"
      }
  }
  ```

- `token` 相关

  - `cookie` 是 HTTP 规范，而 `token` 是自定义传递
  - `cookie` 会默认被浏览器存储，而 `token` 需要自己存储
  - `token` 默认没有跨域限制
  - JWT - JSON Web Token  
    - 前端发起登录动作，后端验证成功之后，返回一个加密的 `token`
    - 前端自行存储这个 `token` （其中包含了加密之后的用户信息）
    - 后续访问服务端接口，都会带上这个 `token` ，作为用户信息

- SSO 单点登录
  - 基于 `cookie`
    - `cookie` 默认不可跨域共享，但有些情况下可以设置成为共享
    - 主域名相同的情况下，设置 `cookie domain` 为主域名，即可共享 `cookie`
    - 主域名完全不同，则 `cookie` 无法共享，需要 SSO 登录系统。也就是将登录验证功能集中到 SSO 系统中

## 二、HTTP 协议

- HTTP 1.0
  - 最基础的 HTTP 协议
  - 支持基本的 `GET POST` 方法
- HTTP 1.1
  - 缓存策略 `cache-control` `E-tag` 等
  - 支持长连接 `Connection:keep-alive` ，一次 TCP 连接多次请求
  - 支持断点续传，状态码为 206
  - 支持新的方法 `PUT DELETE` 等，可以用于 `Restful API`
- HTTP 2.0
  - 支持压缩 `header` ，减小体积
  - 多路复用，一次 TCP 连接中可以多个 HTTP 并行请求
  - 支持服务端推送

## 三、前端攻击

- XSS
  - `Cross Site Script` 跨站脚本攻击
  - 黑客将 JS 代码插入到网页内容中，渲染时执行 JS 代码
  - 预防：特殊字符替换  
  - Vue 框架可以预防，使用 `v-html` 有一定风险

- CSRF
  - `Cross Site Request Forgery` 跨站请求伪造
  - 黑客诱导用户去访问另一个网站的接口，伪造请求
  - 预防：严格的跨域限制 + 验证码机制

- 点击劫持
- DDoS
- SQL 注入

## 四、WebSocket

- 支持端对端通讯
- 可以由 `client` 发起，也可以由 `server` 发起
- 用于：消息通知，直播间讨论，聊天室，协同编辑

```js
// --- server.js ---
const { WebSocketServer } = require("ws")
const wsServer = new WebSocketServer({ port: 3000 })
wsServer.on("connection", ws => {
    console.info("connected")
    
    ws.on("message", msg => {
        console.info("get the message", msg.toString())
        
        setTimeout(() => {
            ws.send(`server get the message: ${msg.toString()}`)
        }, 2000)
    })
})
// --- server.js ---

// --- client.js ---
const ws = new WebSocket("ws://127.0.0.1:3000")
ws.onopen = () => {
    console.info("opened")
    ws.send("client opened")
}

ws.onmessage = (event) => {
    console.info(`get the message ${event.data}`)
}
// --- client.js ---
```

- 先发起一个 HTTP 请求，携带头部 `Connection: Upgrade` `Upgrade: websocket`
- 成功之后再升级成 WebSocket 协议，再进行通讯
- WebSocket 协议名 `ws://` ，可以双端发起请求
- Websocket 没有跨域限制
- 通过 `send` 和 `onmessage` 通讯（HTTP 通过 `req` 和 `res`）
- 实际项目推荐 `socket.io`

## 五、URL 请求全过程

- 网络请求
  - DNS 查询，建立 TCP 连接
  - 浏览器发起 HTTP 请求
  - 收到请求响应，得到 HTML 模板
  - 解析 HTML 过程中，遇到静态资源会继续发起网络请求（静态资源如果是强缓存，则不需要请求）
- 解析
  - HTML 构建 DOM 树
  - CSS 构建 CSSOM 树（style tree）
  - 两者结合，形成 render tree
  - CSS 放在 `<head>` 中，不要异步加载 CSS
  - JS 放在 `<body>` 最下面（或者合理使用 defer async）
  - `<img>` 提前定义 `width` `height`
-  渲染
  - 计算各个 DOM 的尺寸，定位，最后绘制到页面上
  - 遇到 JS 可能会执行
  - 异步 CSS 和图片加载，可能会触发重新渲染

## 六、重绘与重排

- 重绘 repaint
  - 元素外观改变，如颜色和背景色
  - 但是元素的尺寸，定位不变，不会影响到其他元素的位置

- 重排 reflow
  - 重新计算尺寸和布局，可能会影响其他元素的位置
  - 比如元素高度增加，可能会使得相邻元素位置下移
- 区别
  - 重排比重绘要影响更大，消耗更大，要尽量避免无意义的重排
  - 减少重排：集中修改样式，或者直接切换 `css class`
  - 减少重排：修改之前先设置 `display: none` 脱离文档流
  - 减少重排：使用 BFC 特性，不影响其他元素位置
  - 减少重排：频繁触发（`resize` `scroll`）使用节流和防抖
  - 减少重排：使用 `createDocumentFragment` 批量操作 DOM
  - 减少重排：优化动画，使用 `CSS3` 和 `requestAnimationFrame`

## 七、网页通讯

- 网页多标签通讯
  - websocket
    - 无跨域限制
    - 需要服务端支持，成本高
  - localStorage
    - 同域的 A 和 B 两个页面
    - A 页面设置 `localStorage` B 页面可以监听到 `localStorage` 值的修改
  - SharedWorker
    - SharedWorker 是 WebWorker 的一种
    - WebWorker 可以开启子进程执行 JS 但是不能操作 DOM
    - SharedWorker 可以单独开启一个进程，用于同域页面通讯
- 网页与 iframe 通信
  -  postMessage 需要注意跨域的限制和判断



