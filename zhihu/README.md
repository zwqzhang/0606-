# zhihu

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

思路汇集：
文件名：
index--首页 

list--首页中的小卡片列表 （根据每一个时间的盒子‘$('.box')’到整个文档的高度‘$('.box).eq(i).offset().top’减去滚动条的高度‘$(window).scrollTop()’，即元素到可视区顶部的高度来设置nav中应该显示哪一天的日期）

detail--详情页（顶部图片使用定位自己设置，其他数据css、html都是请求回来的数据，css用link标签，设置变量href属性引入，HTML用v-html加一个标签引入。
详情页还有就是收藏功能，新建一个数组用来存储数据、点击时如果数组中没有这个元素，将获取到的id、title、img存储到localStorage中，如果有，点击时将被删除。）

collect--收藏（在localStorage中获取数组赋值给一个新数组，然后循环每一项。）

comment--评论（有长评论和短评论，用不同的接口获取，）

全局组件：back--返回按钮；

全局过滤器：filters/index.js 用来处理时间，一个是list页面列表的时间，一个是评论具体的时间

首先新建一个vue文件，
然后安装能够用到的插件，
框架：mint-ui       主要用来做轮播图板块
动画：animate.css   遮罩层的划入划出
库：jquery          主要用来做index页面划上划下时导航‘首页’变换为日期
vue请求数据：axios
预处理器：stylus    设置一些变量，比如颜色，文字大小，一些重复的样式，便于后期更改；
路由：更改路由地址（config/index.js）
页面图片不显示一直报403错误时，有可能是图片防盗链的问题，在index.html中加入  <meta name="referrer" content="no-referrer">
