## js-web-api

### 1. DOM

- DOM 节点的获取

```js
const div1 = document.getElementById('div1')
const divList = document.getElementsByTagName('div')
const containerList = document.getElementsByClassName('container')
const pList = document.querySelectorAll('p')
```

- DOM 节点的属性

```js
const pList = document.querySelectorAll('p')
const p1 = pList[0]
// property  
p1.style.width = '100px'
console.log(p1.style.width)
p1.className = 'red'
console.log(p1.className)
console.log(p1.nodeName)
console.log(p1.nodeType) //  1
// attribute
p1.setAttribute('data-name', 'imooc')
console.log(p1.getAttribute('data-name'))
p1.setAttribute('style', 'font-size: 50px;')
console.log(p1.getAttribute('style'))
```

- DOM 节点的操作

```js
const div1 = document.getElementById('div1')
const div2 = document.getElementById('div2')
// 新建节点
const newP = document.createElement('p')
newP.innerHTML = 'this is newP'
// 插入节点
div1.appendChild(newP)

// 移动节点
const p1 = document.getElementById('p1')
div2.appendChild(p1)

// 获取父元素
console.log(p1.parentNode)

// 获取子元素列表
const div1ChildNodes = div1.childNodes
const divChildNodesP = Array.prototype.slice.call(div1.childNodes).filter(child => {
    if (child.nodeType === 1) {
        return true
    }
    return false
})

// 移除子元素
div1.removeChild(divChildNodesP[0])
```

- DOM 节点性能

```js
const list = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment()

for (let i = 0; i < 20; i++) {
    const li = document.createElement('li')
    li.innerHTML = `List item ${i}`
    // 先插入文档片段中
    frag.appendChild(li)
}

// 后续统一插入到 DOM 结构中
list.appendChild(frag)
```

### 2. BOM

- navigator

  ```js
  const ua = navigator.userAgent
  const isChrome = ua.indexOf('chrome')
  ```

- screen

  ```js
  console.log(screen.width)
  console.log(screen.height)
  ```

- location

  ```js
  console.log(location.href)
  console.log(location.protocol)
  console.log(location.pathname)
  console.log(location.search)
  console.log(location.hash)
  ```

- history

  ```js
  history.back()
  history.forward()
  ```


### 3. 事件

- 事件绑定

  ```js
  const btn = document.getElementById('btn')
  btn.addEventListener('click', event => {
      console.log('clicked')
  })
  
  // 通用的事件绑定
  function bindEvent(elem, type, fn) {
      elem.addEventListener(type, fn)
  }
  
  const btn = document.getElementById('btn')
  bindEvent(btn, 'click', event => {
      console.log(event.target)
      event.preventDefault() // 阻止默认行为
      alert('clicked')
  })
  ```

- 事件冒泡

  ```js
  function bindEvent(elem, type, fn) {
      elem.addEventListener(type, fn)
  }
  
  const p1 = document.getElemnetById('p1')
  const body = document.body
  bindEvent(p1, 'click', event => {
      event.stopPropagation()  // 阻止事件冒泡
      alert('actived')
  })
  bindEvent(body, 'click', event => {
      alert('cancel')
  })
  ```

- 事件代理

  ```html
  <div id="div">
      <a href="#">a1</a>
      <a href="#">a2</a>
      <a href="#">a3</a>
      <a href="#">a4</a>
  </div>
  ```

  ```js
  // 子元素过多，可以将通用点击事件代理到父元素上
  const div = document.getElementById('div')
  div.addEventListener('click', event => {
      event.preventDefault() //  阻止默认行为
      const target = event.target
      if (event.nodeName === 'A') {
          alert(target.innerHTML)
      }
  })
  ```

### 4. Ajax

- XMLHttpRequest

- 状态码

  ```js
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/data.json', true) // true 为异步
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              alert(xhr.responseText)
          } else if (xhr.status === 404) {
              console.log('404 not found')
          }
      }
  }
  
  xhr.send(null)
  ```

- 跨域：同源策略与跨域解决方案

- Promise 封装 Ajax

  ```js
  function ajax(url) {
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.onreadystatechange = function() {
              if (xhr.readyStatus === 4) {
                  if (xhr.status === 200) {
                      resolve(JSON.parse(xhr.responseText))
                  } else if (xhr.status === 404 || xhr.status === 500) {
                      reject(new Error(`404 not found`))
                  }
              }
          }
          xhr.send(null)
      })
  }
  
  const url = '/api/data.json'
  ajax(url).then(res => console.log(res)).catch(err => console.log(err))
  ```

  