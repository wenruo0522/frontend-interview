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

### 3. 性能优化

- 使用内存与缓存

  ```js
  //  静态资源加 hash 后缀，根据文件内容计算 hash
  module.exports = {
      mode: 'production',
      entry: path.join(__dirname, 'src', 'index'),
      output: {
          filename: 'bundle.[contenthash].js',
          path: path.join(__dirname, 'dist')
      }
  }
  ```

- 减少 CPU 计算量，减少网络加载耗时

- 加载更快：可以减少资源体积，比如压缩代码。可以减少访问次数，比如合并代码，SSR 服务端渲染

  可以使用 CDN 进行加速

- 渲染更快：图片懒加载，上滑加载更多，对 DOM 操作进行优化，节流，防抖

  ```html
  <img id='img' src='preview.png' data-realsrc='abc.png'/>
  <script type="text/javascript">
      let img = document.getElemnetById('img')
      img.src = img.getAttribute('data=realsrc')
  </script>
  ```


#### 4. 节流与防抖

- 节流   

- 防抖

  ```js
  const input = document.getElementById('input')
  
  function debounce(fn, delay = 500) {
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
  
  input.addEventListener('keyup', debounce((e) => {
      // ToDo
      console.log(e.target)
  }, 600))
  ```

  
