## 一、数组扁平化

- 实现数组扁平化，只减少一级嵌套

  ```js
  export function flatten1(arr: any[]): any[] {
      const res: any[] = []
      
      arr.forEach(item => {
          if (Array.isArray(item)) {
              item.forEach(subItem => res.push(subItem))
          } else {
              res.push(item)
          }
      })
      
      return res
  }
  
  epxort function flatten2(arr: any[]): any[] {
      let res: any[] = []
      arr.forEach(item => {
          res = res.concat(item)
      })
      return res
  }
  
  ```

- 实现数组扁平化，减少所有嵌套

  ```js
  export function flattenDeep1(arr: any[]): any[] {
      const res: any[] = []
      
      arr.forEach(item => {
          if (Array.isArray(item)) {
              const flatItem = flattenDeep1(item)
              flatItem.forEach(subItem => res.push(subItem))
          } else {
              res.push(item)
          }
      })
      
      return res
  }
  
  export function flattenDeep2(arr: any[]): any[] {
      let res: any[] = []
      
      arr.forEach(item => {
          if (Array.isArray(item)) {
              const flatItem = flattenDeep2(item)
              res = res.concat(flatItem)
          } else {
              res = res.concat(item)
          }
      })
      
      return res
  }
  ```

## 二、获取类型

- typeof - 只能判断值类型，其他就是 function 和 object

- instanceof - 需要两个参数来判断，而不是获取类型

  ```js
  export function getType(x: any): string {
      const originType = Object.prototype.toString.call(x)
      const spaceIndex = originType.indexOf(" ")
      const type = originType.slice(spaceIndex + 1, -1)
      return type.toLowerCase()
  }
  ```

## 三、new 发生了什么

- `class` 是 `Function` 的语法糖

  ```js
  class Foo {
      name: string
      constructor(name: string) {
          this.name = name
      }
      
      getName() {
          return this.name
      }
  }
  
  function Foo(name) {
      this.name = name
  }
  Foo.prototype.getName = function() {
      return this.name
  }
  
  const f = new Foo("test")
  f.getName() // "test"
  ```

- 创建一个空对象 `obj` 继承构造函数的原型

- 执行构造函数（将 `obj` 作为 `this` ）

- 返回 `obj`

  ```js
  export function customNew<T>(constructor: Function, ...args: any[]): T {
      const obj = Object.create(constructor.prototype)
      constructor.apply(obj, args)
      return obj
  }
  ```

- `{}` 创建空对象，原型指向 `Objet.prototype`
- `Object.create` 创建空对象，原型指向传入的参数

## 四、DOM Tree

- 深度优先遍历

  ```js
  function visitNode(n: Node) {
      if (n instanceof Comment) {
          console.info(`Comment node - ${n.textContent}`)
      }
      if (n instanceof Text) {
          const t = n.textContent?.trim()
          if (t) {
              console.info(`Text node - ${t}`)
          }
      }
      if (n instanceof HTMLElement) {
          console.info(`Eleemnt node - <${n.tagName.toLoweCase()}>`)
      }
  }
  
  function depthFirstTraverse1(root: Node) {
      visitNode(root)
      
      const childNodes = root.childNodes
      if (childNodes.length) {
          childNodes.forEach(child => {
              depthFirstTraverse1(child)
          })
      }
  }
  
  // 使用栈来实现
  
  function depthFirstTraverse2(root: Node) {
      const stack: Node[] = []
      stack.push(root)
      
      while(stack.length > 0) {
          const curNode = stack.pop()
          if (curNode === null) {
              break
          }
         
          visitNode(curNode)
          const childNodes = curNode.childNodes
          if (childNodes.length > 0) {
              Array.from(childNodes).reverse().forEach(child => {
                  stack.push(child)
              })
          }
      } 
  }
  ```

- 广度优先遍历

  ```js
  function visitNode(n: Node) {
      if (n instanceof Comment) {
          console.info(`Comment node - ${n.textContent}`)
      }
      if (n instanceof Text) {
          const t = n.textContent?.trim()
          if (t) {
              console.info(`Text node - ${t}`)
          }
      }
      if (n instanceof HTMLElement) {
          console.info(`Eleemnt node - <${n.tagName.toLoweCase()}>`)
      }
  }
  
  function breadthFirstTraverse(root: node) {
      const queue: Node[] = []
      
      queue.unshift(root)
      
      while(queue.length > 0) {
          const curNode = queue.pop()
          if (curNode === null) { break }
          visitNdoe(curNode)
          
          const childNodes = curNode.childNodes
          if (childNodes.length) {
              childNodes.forEach(child => {
                  queue.unshift(child)
              })
          }
      }
  }
  ```

## 五、LazyMan

- 支持 `sleep` 和 `eat` 两个方法

- 支持链式调用

- 由于有 `sleep` 功能，函数不能直接在调用时触发

- 初始化一个列表，把函数注册进去

- 由每个 `item` 触发 `next` 执行（遇到 `sleep` 则异步触发）

  ```js
  class LazyMan {
      private name: string
      private tasks: Function[] = []
      constructor(name: string) {
          this.name = name
          setTimeout(() => {
              this.next()
          })
      }
  
  	private next() {
          const task = this.tasks.shift()
          if (task) { task() }
      }
  
  	eat(food: string) {
          const task = () => {
              console.info(`${this.name} eat ${food}`)
              this.next()
          }
          this.tasks.push(task)
          return this
      }
  
  	sleep(seconds: number) {
          const task = () => {
              setTimeout(() => {
                  console.info(`${this.name} sleep ${seconds}`)
                  this.next()
              }, seconds * 1000)
          }
          this.tasks.push(task)
          return this
      }
  }
  
  const me = new LazyMan("lazy")
  me.eat("apple").eat("banana").sleep(2).eat("noodle")
  ```

## 六、函数柯里化

- 函数式编程

  ```js
  export function curry(fn: Function) {
      const fnArgsLength = fn.length
      let args: any[] = []
      function calc(this: any, ...newArgs: any[]) {
          args = [
              ...args,
              ...newArgs
          ]
          if (args.length < fnArgsLength) {
              return calc
          } else {
              return fn.apply(this, args.slice(0, fnArgsLength))
          }
      }
      
      return calc
  }
  
  function add(a: number, b: number, c: number): number {
      return a + b + c
  }
  
  add(10, 20, 30) // 60
  
  const curryAdd = curry(add)
  curryAdd(10)(20)(30) // 60
  ```

## 七、instanceof

- 例如 `f instanceof Foo`

- 沿着 `f.__proto__` 向上查找，看能否找到 `Foo.prototype`

  ```js
  export function myInstanceof(instance: any, origin: any): boolean {
  	if (instance === null) {
          return false
      }
      
      const type = typeof instance
      if (type !== "object" && type !== "function") {
      	return false 
      }
      
      let tempInstance = instance // 为了防止修改 instance
      while(tempInstance) {
          if (tempInstance.__proto__ === origin.prototype) {
              return true
          }
          tempInstance = tempInstance.__proto__ // 顺着原型链往上找
      }
      
      return false
  }
  ```


## 八、bind & apply & call

- bind

  - 放回一个新函数，但是不执行
  - 绑定 `this` 和部分参数
  - 如果是箭头函数，无法改变 `this` 只能改变参数

  ```js
  Function.prototype.customBind = function(context: any, ...bindArgs: any[]) {
      const self = this
      
      return function(...args: any[]) {
          const newArgs = bindArgs.concat(args)
          return self.apply(context, newArgs) 
      }
  }
  
  Function.prototype.customCall = function(context: any, ...args: any[]) {
      if (context === null) {
          context = globalThis
      }
      if (typeof context !== "object") {
          context = new Object(context)
      }
      
      const fnKey = Symbol()
      context[fnKey] = this // fn.apply() -> this = fn
      const res = context[fnKey](...args)
      delete context[fnKey]
      return res
  }
  ```

## 九、EventBus

- `on once emit off`

- `on` 和 `once` 注册函数，存储起来 `emit` 时找到对应的函数，并执行 `off` 找到对应的函数并删除

  ```js
  const dataStruct = {
      "eventkey": [
          {
              fn: fn1, isOnce: false
          },
          {
              fn: fn2, isOnce: true
          }
      ]
  }
  
  class EventBus {
      private events: {
          [key: string]: Array<{fn: Function; isOnce: boolean}>
      }
          
      constructor() {
          this.events = {}
      }
          
      on(type: string, fn: Function, isOnce: boolean = false) {
          const events = this.events
          if (events[type] === null) {
              events[type] = []
          }
          events[type].push({ fn, isOnce })
      }
      
      once(type: string, fn: Function) {
          this.on(type, fn, true)
      }    
      
      off(type: string, fn?: Function) {
          if (!fn) {
              this.events[type] = []
          } else {
              const fnList = this.events[type]
              if (fnList) {
                  this.events[type] = fnList.filter(item => item.fn !== fn)
              }
          }
      } 
          
      emit(type: string, ...args: any[]) {
          const fnList = this.events[type]
          if (fnList === null) {
              return
          }
          this.events[type] = fnList.filter(item => {
              const { fn, isOnce } = item
              fn(...args)
              
              if (!isOnce) {
                  return true
              }
              return false
          })
      }    
  }
  
  class EventBus2 {
      private events: { [key: string]: Array<Function> }
  	private onceEvents: { [key: string]: Array<Function> }
      
      constructor() {
          this.events = {}
          this.onceEvents = {}
      }
                           
      on(type: string, fn: Function) {
          const events = this.events
          if (events[type] === null) {
              events[type] = []
          }
          events[type].push(fn)
      }
                           
      once(type: string, fn: Function) {
          const onceEvents = this.onceEvents
          if (onceEvents[type] === null) {
              onceEvents[type] = []
          }
          onceEvents[type].push(fn)
      }                     
      
      off(type: string, fn?: Function) {
          if (!fn) {
              this.events[type] = []
              this.onceEvents[type] = []
          } else {
              const fnList = this.events[type]
              const onceFnList = this.onceEvents[type]
              if (fnList) {
                  this.events[type] = fnList.filter(curFn => curFn !== fn)
              }
              if (onceFnList) {
                  this.onceEvents[type] = onceFnList.filter(curFn => curFn !== fn)
              }
          }
      }
                
      emit(type: string, ...args: any[]) {
          const fnList = this.events[type]
          const onceFnList = this.onceEvents[type]
          
          if (fnList) {
              fnList.forEach(f => f(...args))
          }
          
          if (onceFnList) {
              onceFnList.forEach(f => f(...args))
              this.onceEvents[type] = []
          }
      }                     
  }
  ```

## 十、LRU

- LRU - Least Recently Used 最近使用

- 如果内存优先，只缓存最近使用的，删除沉水数据

- 核心 API `get set`

- 用哈希表来存储 + 有序 = Map

- 可以使用双向链表来实现

  ```js
  class lruCache {
      private length: number
      private data: Map<any, any> = new Map()
      constructor(length: number) {
          if (length < 1) {
              throw new Error(`invalid length`)
          }
          this.length = length
      }
  
  	set(key: any, value: any) {
          const data = this.data
          // 先删除，重设 -> 将数据变为最新的
          if (data.has(key)) {
              data.delete(key)
          }
          data.set(key, value)
          
          if (data.size > this.length) {
              const delKey = data.keys().next().value
              data.delete(delKey)
          }
      }
  
  	get(key: any): any {
          const data = this.data
          
          if (!data.has(key)) {
              return null
          }
          const value = data.get(key)
          data.delete(key)
          data.set(key, value)
          return value
      }
  }
  
  const lruCache = new LRUCache(2)
  lruCache.set(1, 1) // { 1=1 }
  lruCache.set(2, 2) // { 1=1, 2=2 }
  lruCache.get(1) // 1  { 2=2, 1=1 }
  lruCache.set(3, 3) // { 1=1, 3=3 }
  lruCache.get(2) // null
  lruCache.set(4, 4) //  { 3=3, 4=4 }
  lruCache.get(3) //  { 4=4, 3=3 }
  ```
  

## 十一、手写深拷贝

- 使用 `JSON.stringify` 和 `parse` 无法转换函数以及 `Map Set` 和循环引用

- `Object.assign` 并非深拷贝

- 普通深拷贝 - 只考虑 `Object Array` 无法转换 `Map Set` 和循环引用

  ```js
  // 考虑 Object Array Map Set
  // 考虑循环引用
  export function cloneDeep(obj: any, map = new WeakMap()): any {
      if (typeof obj !== "object" || obj === null) {
          return obj
      }
      
      const objFromMap = map.get(obj)
      if (objFromMap) {
          return objFromMap
      }
      
      let target: any = {}
      map.set(obj, target)
      
      if (obj instanceof Map) {
          target = new Map()
          obj.forEach((value, key) => {
              const newVal = cloneDeep(value, map)
              const newKey = cloneDeep(key, map)
              target.set(newKey, newVal)
          })
      }
      
      if (obj instanceof Set) {
          target = new Set()
          obj.forEach(value => {
              const newVal = cloneDeep(value, map)
              target.add(newVal)
          })
      }
      
      if (obj instanceof Array) {
          target = obj.map(item => cloneDeep(item, map))
      }
      
      for (const key in obj) {
          const value = obj[key]
          const newVal = cloneDeep(value, map)
          target[key] = newVal
      }
      
      return target
  }
  ```

  





















