## prod-env

### 1. 网页渲染与加载

- DNS 解析
-  浏览器根据 IP 地址向服务器发起 http 请求
- 服务器处理 http 请求，并返回给浏览器
- 根据 HTML 代码生成 DOM Tree
- 根据 CSS 代码生成 CSSOM
- 将 DOM Tree 和 CSSOM 整合形成 Render Tree
- 根据 Render Tree 渲染页面
- 遇到 <script> 暂停渲染，优先加载并执行 js 代码，完成再继续
- 直至把 Render Tree 渲染完成

