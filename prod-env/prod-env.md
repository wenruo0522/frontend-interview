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

### 2. window.onload 与 DOMContentLoaded

- window.onload 需要页面的所有资源全部加载完才会执行
- DOMContentLoaded 在 DOM 渲染完即可执行，此时，图片与视频等文件可以不用加载完成 

```html
<div>
    <img id="img" src="www.example.com/image">
</div>
```

```js
const img = document.getElementById('img')
img.onload = function() {
    console.log('img loaded')
}
window.addEventListener('load', function() {
    console.log('window loaded')
})

document.addEventListener('DOMContentLoaded', function() {
    console.log('dom content loaded')
})

// 1. dom content loaded  2. img loaded  3. window loaded
```

