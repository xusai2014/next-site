## Next JS

### Introduction

基于React构建一个完整的WEB应用，有许多需要考虑点：
- 构建打包，比如打包工具webpack、转译编译器Babel
- 生产模式优化，比如代码分割
- 基于性能和SEO角度，要考虑预渲染方案。同事也需要考虑服务端渲染或者客户端渲染问题
- 在服务端编写代码去连接React应用的数据存储

能够解决这些问题的框架是存在的，但是必须要有正确的抽象级别。否则可用性会很低的。同时需要具有极佳的额开发者体验。

#### Next.js 基于React框架

来走进Next.js (基于React框架)，它为以上问题提供了一整套解决方案。
但更重要是，当构建React应用时确保你和你的团队避免重复踩坑。

[The pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/)

next.js主旨是为用户提供同类最优的用户体验及丰富的内置功能，例如：

- (直观的页面路由系统 （同时支持动态路由）)[https://nextjs.org/docs/basic-features/pages]
- (支持预渲染，每个页面都支持静态生成和服务端直出)[https://nextjs.org/docs/basic-features/pages]
- 自动化代码分割，支持快速加载
- 客户端渲染路由方式支持优先预加载
- (内置CSS处理、支持Sass语法、支持任意css-in-js库)[https://nextjs.org/docs/basic-features/built-in-css-support]
- 开发者模式下支持热更新
- (API路由使用Serverless Function构造API端)[https://nextjs.org/docs/api-routes/introduction]
- 完全可拓展

Next.js被用于数以万计的面向生产的网站和web应用程序，其中包括许多世界上最大的品牌。


### 开始

#### 配置

 ```
 node >= 10.13
 ```
```shell
npx create-next-app@latest
# or
yarn create next-app

npx create-next-app@latest --typescript
# or
yarn create next-app --typescript

## 知识文档
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

```

#### 路由跳转

页面路由是基于文件名称关联起来的，比如：

- 目录pages/index.js -> /
- pages/posts/first-post.js -> /posts/first-post 

Link组件用法
- 在页面之间跳转，默认常用 HTML a 标签，HTML资源服务端获取。
- 在Next.js中通过Link包裹 a标签,这使得应用中不同页面可进行客户端路由跳转比默认的快。（类似单页应用）
- 页面转场过渡体验好

代码分割

- Next.js自动为每一个页面进行代码分割，所以每个页面仅加载当前页面需要的模块。
- 假如A页面渲染加载，则其余页面代码是不可用。
- 假如你有几百个页面，会保证页面加载速度不会因项目规模，渲染速度线性下降。
- 页面代码按需加载意味每个页面都是独立的，不会因为一个页面问题导致整体不可用
- Next.js项目production模式下,只要Link组件出现在浏览器视区内，会在动在后台优先获取代码，当点击跳转时几乎瞬时载入。


#### 资源、元数据、CSS

##### 资源
Next.js 可托管静态资源（比如图片），存放在顶级public目录下。
- [该目录下资源可能会被应用进行引用](https://nextjs.org/docs/basic-features/static-file-serving)
- 也存放robots.txt 、Google Site Verification、其它类型静态资源

图片处理分为正常的img标签和 [next/image](https://nextjs.org/docs/basic-features/image-optimization) 组件两种方式，该组件优点在于：
- 自动化处理不同尺寸下响应式
- 不需要引用三方组件来优化图片
- 仅加载视区内图片
- 更先进图片格式
- 视觉稳定性，自动修正CLS
- Faster Page Loads: Images are only loaded when they enter the viewport, with optional blur-up placeholders
- Asset Flexibility: On-demand image resizing, even for images stored on remote servers

[图片组件全局配置](https://nextjs.org/docs/api-reference/next/image#configuration-options)

[图片组件Loader](https://nextjs.org/docs/api-reference/next/image#loader-configuration)

- 开发者模式下默认使用 [squoosh](https://www.npmjs.com/package/@squoosh/lib)
- 生产模式推荐 [sharp](https://www.npmjs.com/package/sharp)

Images are always rendered in such a way as to avoid Cumulative Layout Shift, a Core Web Vital that Google is going to use in search ranking.


##### 元数据
[next/head](https://nextjs.org/docs/api-reference/next/head)
```javascript
import Head from 'next/head'
```

```html
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```

[Custom Document](https://nextjs.org/docs/advanced-features/custom-document)

./pages/_document.js

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```
getInitialProps方法形参context, 如下是该对象具体属性:

- pathname （当前路由, 即页面在/pages中路径）
- query （Query字符串从URL中解析的对象）
- asPath （在浏览器中真实显示的路径字符串，包括query字符串）
- req   （HTTP 请求对象 server only)
- res   （HTTP 响应对象 server only)
- err  （渲染期间遇到错误Error 对象）

警告
- Document 仅在服务端渲染执行, 类似onClick事件委托是不生效的.
- Main组件以外的React组件是不能够被浏览器初始化的。不能增加应用逻辑或者自定义CSS在这里，如想添加公共组件请在 App Component中操作.
- Document中 [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps) 在客户端过渡时不会被调用。也不再静态优化过程中调用。
- Document目前不支持Next.js数据获取方式 getStaticProps、 getServerSideProps

##### 三方库

Third-party JavaScript refers to any scripts that are added from a third-party source. Usually, third-party scripts are included in order to introduce newer functionality into a site that does not need to be written from scratch, such as analytics, ads, and customer support widgets.

[next/script](https://nextjs.org/docs/api-reference/next/script)

```javascript
import Script from 'next/script'

()=>(
    <Head>
    <title>First Post</title>
    <script src="https://connect.facebook.net/en_US/sdk.js" />
    <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
        }
    />
</Head>);
```

##### CSS Styling

  *** 内置裁切服务 ***

Next.js 内置支持CSS 、Sass



