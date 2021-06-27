## 一、如何理解html语义化

1. 增加代码可读性

2. 优化搜素引擎检索（SEO）

## 二、块状元素 & 内联元素

1. display: block/table 例如 div h1 h2 table ul ol p 等
2. display: inline/inline-block 例如 span img input button 等

## 三、盒模型

```	html
<!-- 如下代码，请问 div1 的 offsetWidth 是多大？ -->
<!-- 如何让 offsetWidth 变更为 100px -->
<style>
    #div1 {
        width: 100px;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 10px;
    }
</style>

<div id="div1">
</div>
```

offsetWidth = width + padding + border = 100 + 20 + 2 = 122px 

div1 样式中添加 box-sizing: border-box

## 四、margin 纵向重叠问题

```html
<!-- 如下代码，AAA 和 BBB 之间距离是多少 -->
<style>
    p {
        font-size: 16px;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 15px;
    }
</style>
<p>AAA</p>
<p></p>
<p></p>
<p>BBB</p>
```

相邻元素的 margin-top 和 margin-bottom 会发生重叠

空白内容的 <p></p> 也会重叠（忽略）

答案： 15px

## 五、BFC

Block format context  块级格式化上下文

一块独立渲染区域，内部元素的渲染不会影响边界以外的元素

形成 BFC 的常见条件

1. float 不是 none
2. position 是 absolute 或者 fixed
3. overflow 不是 visible
4. display 是 flex inline-block 等

## 六、水平居中

1. inline 元素：text-align: center
2. block 元素：margin: auto
3. absolute 元素：left: 50% + margin-left 负值

## 七、垂直居中

1. inline 元素：line-height 的值等于 height 的值
2. absolute 元素：top: 50% + margin-top 负值
3. absolute 元素：transform: translate(-50%, -50%)
4. absolute 元素：top, left, bottom, right = 0 + margin: auto 

## 八、line-height 如何继承

1. 写具体数值，比如 30px，则继承该值
2. 写比例，比如 2/1.5，则继承该比例
3. 写百分比，比如 200%，则继承计算出来的值

## 九、响应式

1. rem 是相对长度单位。和 em 不同，em 是相对于父元素的，rem 是相对于根元素的。常用于响应式布局。
2.  media-query，根据不同的屏幕宽度来设置根元素的 font-size。然后基于根元素的相对单位 rem 来实现响应式。
3. window.screen.height // 屏幕高度   window.innerHeight  // 网页视口高度  document.body.clientHeight //  body 高度 
4. vh  //  网页视口高度的 1/100   vw  //  网页视口宽度的 1/100  vmax 取两者最大值  vmin 取两者最小值