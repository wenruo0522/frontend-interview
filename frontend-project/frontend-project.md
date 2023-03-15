## 一、首屏优化

- 路由懒加载
  - 适用于 SPA（不适用 MPA）
  - 路由拆分，优先保证首页加载
- 服务端渲染 SSR
  - 传统的前后端分离（SPA）渲染页面的过程复杂
  - SSR 渲染页面过程简单，性能好
  - 纯 H5 页面，SSR 是性能优化的终极方案

- APP 预取
  - 如果 H5 在 App WebView 中展示，可以使用 App 预取
  - 用户访问列表页时，App 预加载文章首屏内容
  - 用户进入 H5 页，直接从 App 中获取内容，瞬间展示首屏
- 分页
  - 针对列表页，默认只展示第一页内容，上划加载更多
- 图片懒加载 lazyLoad
  - 针对详情页，默然只展示文本内容，然后触发图片懒加载
  - 注意：提前设置图片尺寸，尽量只重绘不重排

- Hybrid
  - 提前将 HTML JS CSS 下载到 App 内部
  - 在 App webview 中使用 `file://` 协议加载页面文件
  - 再用 Ajax 获取内容并展示（也结合 App 预取）

## 二、后端返回大量数据（10W 条）

- 技术方案不合理
  - 比如采用分页数据获取
- 浏览器处理能力考量
  - JS 没问题
  - 渲染到 DOM 会比较卡顿（性能瓶颈）
  - 自定义中间层
    - 自定义 nodejs 中间层，获取并拆分这 10W 条数据
    - 前端对接 nodejs 中间层，而不是服务端
  - 虚拟列表
    - 只渲染可视区域 DOM
    - 其他隐藏区域不显示，只用 `<div>` 撑起高度
    - 随着浏览器滚动，创建和销毁 DOM
    - 虚拟列表实现较为复杂，可以借用第三方 `lib`
    - `Vue-virtual-scroll-list`
    - `React-virtualiszed`

## 三、设计模式

- 设计原则
  - 最重要的原则：开放封闭原则
  - 对扩展开放，对修改封闭
- 工厂模式
  - 用一个工厂函数，来创建实例，隐藏 `new`
  - 比如 `jQuery $` 函数，`React createElement` 函数

```js
function factory() {
    // 将 if-else 业务逻辑隐藏起来
    return new Foo()
}

const f = factory()
```

- 单例模式
  - 全局唯一的实例（无法生成第二个）
  - 比如 `Vuex Redux` 中的 `store`
  - 比如全局唯一的 `dialog modal`

```js
class SingleTon {
    private static instance: SingleTon | null = null
    private constructor() {}
    public static getInstance(): SingleTon {
        if (this.instance === null) {
            this.instance = new SingleTon()
        }
        return this.instance
    }
	someMethod() {}
}
// 静态方法与实例方法
const s = SingleTon.getInstance()
s.someMethod()
```

-  代理模式
  - 使用者不能直接访问对象，而是访问一个代理层
  - 在代理层可以监听 `get` `set` 做很多事情
  - 比如 `ES6 Proxy` 实现 `Vue3` 响应式

- 观察者模式

```js
btn.addEventListener("click", () => {})
```

- 发布订阅模式

```js
event.on("event-key", () => {})
event.on("another-event-key", () => {})

event.emit("event-key")
```

- 装饰器模式
  - 原功能不变，增加一些新功能
  - ES 和 Typescript 的 `Decorator` 语法
  - 类装饰器，方法装饰器

## 四、Vue 相关

- 优化相关
  - `v-if` 和 `v-show`
    - `v-if` 彻底销毁组件，`v-show` 使用 `CSS` 隐藏组件
    - 大部分情况下使用 `v-if` 更好，不要过度优化
  - 使用 `computed` 缓存
  - `keep-alive` 缓存组件
    - 频繁切换的组件，比如 `tabs`
    - 不要乱用，缓存太多会占用内存，而且不好 `debug`
  - 异步组件
    - 针对体积较大的组件，比如编辑器、复杂表格和复杂表单
    - 拆包，需要的时候异步加载，不需要的时候不加载
    - 减少主包的体积，首页会加载更快
  - 路由懒加载
    - 项目比较大的时候，拆分路由，保证首页先加载
  - 服务端渲染

- 踩坑相关
  - 内存泄漏
    - 全局变量，全局事件，全局定时器
    - 自定义事件绑定之后没有销毁
  - Vue2 响应式的缺陷（Vue3 已经修复）
    - `data` 新增属性用 `Vue.set`
    - `data` 删除属性用 `Vue.delete`
    - 无法直接修改数据 `arr[index] = value`
  - 路由切换时候 `scroll` 到顶部
    - SPA 系统均存在类似问题
    - 比如列表页滚动到第二屏时候，点击进入详情页，再返回到列表页就会 `scroll` 到顶部
    - 在列表页缓存数据和 `scrollTop` 值
    - 当再次返回列表页的时候，渲染组件，执行 `scrollTo(xx)`
    - 终结解决方案： MPA + webview

- 监听 Vue 组件报错

  - window.onerror

    - 全局监听所有 JS 错误
    - 但是它是 JS 级别的，识别不了 Vue 组件报错
    - 可以捕捉一些 Vue 监听不到的错误

    ```js
    window.onerror = function(msg, source, line, column, error) {
        console.info(`${msg} - ${source} - ${line} - ${column} - ${error}`)
    }
    
    window.addEventListener("error", event => {
        console.info(`event - ${event}`)
    })
    ```

  - errorCaptured 生命周期

    - 监听所有下级组件的错误
    - 返回 false 会阻止向上传播
    - 无法监听异步任务的报错

    ```js
    errorCaptured: (err, vm, info) => {
        console.log(`${err} - ${vm} - ${info}`)
    }
    ```

  - errorHandler 配置

    - Vue 全局错误监听，所有组件错误都会汇总到这里
    - 但是 errorCaptured 返回 false  不会传播到这里
    - 无法监听异步任务的报错

    ```js
    // --- main.js ---
    app.config.errorHandler = (error, vm, info) => {}
    // --- main.js ---
    ```

## 五、性能排查

- 前端性能指标
  - First Paint - FP
  - First Contentful Paint - FCP
  - First Meaningful Paint - FMP（已经弃用，改用 LCP ）
  - DomContentLoaded - DCL
  - Largest Contentful Paint - LCP
  - Load - L
- Chrome devTools
  - Performance 可以查看上述性能指标，并有网页快照
  - NetWork 可以查看各个资源的加载时间
- Lighthouse
  - 第三方性能测评工具
  - 支持移动端和 PC 端
- 网页加载慢 - FP 比较大
  - 优化服务端硬件配置，使用 CDN
  - 路由懒加载，大组件异步加载 - 减少主包的体积
  - 优化 HTTP 缓存策略
- 网页渲染慢 - FP 和 FCP 间隔大
  - 优化服务端接口（比如 Ajax 获取数据慢）
  - 优化前端组件内部逻辑
  - 服务端渲染 SSR