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

  

