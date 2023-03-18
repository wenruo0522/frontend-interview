## 一、["1", "2", "3"].map(parseInt)

- parseInt(str, radix)

  - 解析一个字符串，返回十进制整数

  - `str` 为要解析的字符串

  - `radix` 基数范围 `2-36`

    ```js
    parseInt("11", 2) // 3
    parseInt("3", 2) // NaN
    
    ["1", "2", "3"].map(parseInt) = [1, NaN, NaN]
    const nums = ["1", "2", "3"]
    const res = nums.map((item, index) => {
        // item - 1, index - 0
        // item - 2, index - 1
        // item - 3, index - 2
        return parseInt(item, index)
    })
    ```

## 二、数组与树

- 将数组转换成树

  ```js
  const arr = [
      { id: 1, name: "partment A", parentId: 0 },
      { id: 2, name: "partment B", parentId: 1 },
      { id: 3, name: "partment C", parentId: 1 },
      { id: 4, name: "partment D", parentId: 2 },
      { id: 5, name: "partment E", parentId: 2 },
      { id: 6, name: "partment F", parentId: 3 },
  ]
  
  interface IArrayItem {
      id: number,
      name: string,
      parentId: number
  }
  
  interface ITreeNode {
      id: number
      name: string
      children?: ITreeNode[]
  }
  
  function convert(arr: IArrayItem[]) : ITreeNode | null {
      const idToTreeNode: Map<number, ITreeNode> = new Map()
      let root = null
      arr.forEach(item => {
          const { id, name, parentId } = item
          const treeNode: ITreeNode = { id, name }
          idToTreeNode.set(id, treeNode)
          
          const parentNode = idToTreeNode.get(parentId)
          if (parentNode) {
              if (parentNode.children === null) {
                  parentNode.children = []
              }
              parentNode.children.push(treeNode)
          }
          
          if (parentId === 0) {
              root = treeNode
          }
      })
     
      return root
  }
  ```

- 将树转换成数组

  ```js
  const obj = {
      id: 1,
      name: "department A",
      children: [
          {
              id: 2,
              name: "department B",
              children: [
                  { id: 4, name: "department D" },
                  { id: 5, name: "department E" }
              ]
          }
      ]
  }
  
  interface IArrayItem {
      id: number,
      name: string,
      parentId: number
  }
  
  interface ITreeNode {
      id: number
      name: string
      children?: ITreeNode[]
  }
  
  function convert(root: ITreeNode): IArrayItem[] {
      const nodeToParent: Map<ITreeNode, ITreeNode> = new Map()
      
      const arr: IArrayItem[] = []
      const queue: ITreeNode[] = []
      queue.unshift(root)
      while(queue.length > 0) {
          const curNode = queue.pop()
          if (curNode === null) {
              break
          }
          
          const { id, name, children = [] } = curNode
          
          const parentNode = nodeToParent.get(curNode)
          const parentId = parentNode?.id || 0
          const item = { id, name, parentId }
          arr.push(item)
          
          children.forEach(child => {
              nodeToParent.set(child, curNode)
              queue.unshift(child)
          })
      }
      
      return arr
  }
  
  ```

## 三、构造函数和原型的重名属性

- 示例代码

  ```js
  function Foo() {
      Foo.a = function() { console.log(1) }
      this.a = function() { console.log(2) }
  }
  
  Foo.prototype.a = function() { console.log(3) }
  Foo.a = function() { console.log(4) }
  
  Foo.a() // 4
  let obj = new Foo()
  obj.a() // 2
  Foo.a() // 1
  ```

  