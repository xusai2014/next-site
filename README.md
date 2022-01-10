## Next JS

### Introduction

基于 React 构建一个完整的 WEB 应用，有许多需要考虑点：

- 构建打包，比如打包工具 webpack、转译编译器 Babel
- 生产模式优化，比如代码分割
- 基于性能和 SEO 角度，要考虑预渲染方案。同事也需要考虑服务端渲染或者客户端渲染问题
- 在服务端编写代码去连接 React 应用的数据存储

能够解决这些问题的框架是存在的，但是必须要有正确的抽象级别。否则可用性会很低的。同时需要具有极佳的额开发者体验。

#### Next.js 基于 React 框架

来走进 Next.js (基于 React 框架)，它为以上问题提供了一整套解决方案。
但更重要是，当构建 React 应用时确保你和你的团队避免重复踩坑。

[The pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/)

next.js 主旨是为用户提供同类最优的用户体验及丰富的内置功能，例如：

- [直观的页面路由系统(同时支持动态路由)](https://nextjs.org/docs/basic-features/pages)
- [支持预渲染，每个页面都支持静态生成和服务端直出](https://nextjs.org/docs/basic-features/pages)
- 自动化代码分割，支持快速加载
- 客户端渲染路由方式支持优先预加载
- [内置 CSS 处理、支持 Sass 语法、支持任意 css-in-js 库](https://nextjs.org/docs/basic-features/built-in-css-support)
- 开发者模式下支持热更新
- [API 路由使用 Serverless Function 构造 API 端](https://nextjs.org/docs/api-routes/introduction)
- 完全可拓展

Next.js 被用于数以万计的面向生产的网站和 web 应用程序，其中包括许多世界上最大的品牌。

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

- 目录 pages/index.js -> /
- pages/posts/first-post.js -> /posts/first-post

Link 组件用法

- 在页面之间跳转，默认常用 HTML a 标签，HTML 资源服务端获取。
- 在 Next.js 中通过 Link 包裹 a 标签,这使得应用中不同页面可进行客户端路由跳转比默认的快。（类似单页应用）
- 页面转场过渡体验好

代码分割

- Next.js 自动为每一个页面进行代码分割，所以每个页面仅加载当前页面需要的模块。
- 假如 A 页面渲染加载，则其余页面代码是不可用。
- 假如你有几百个页面，会保证页面加载速度不会因项目规模，渲染速度线性下降。
- 页面代码按需加载意味每个页面都是独立的，不会因为一个页面问题导致整体不可用
- Next.js 项目 production 模式下,只要 Link 组件出现在浏览器视区内，会在动在后台优先获取代码，当点击跳转时几乎瞬时载入。

#### 资源、元数据、CSS

##### 资源

Next.js 可托管静态资源（比如图片），存放在顶级 public 目录下。

- [该目录下资源可能会被应用进行引用](https://nextjs.org/docs/basic-features/static-file-serving)
- 也存放 robots.txt 、Google Site Verification、其它类型静态资源

图片处理分为正常的 img 标签和 [next/image](https://nextjs.org/docs/basic-features/image-optimization) 组件两种方式，该组件优点在于：

- 自动化处理不同尺寸下响应式
- 不需要引用三方组件来优化图片
- 仅加载视区内图片
- 更先进图片格式
- 视觉稳定性，自动修正 CLS
- Faster Page Loads: Images are only loaded when they enter the viewport, with optional blur-up placeholders
- Asset Flexibility: On-demand image resizing, even for images stored on remote servers

[图片组件全局配置](https://nextjs.org/docs/api-reference/next/image#configuration-options)

[图片组件 Loader](https://nextjs.org/docs/api-reference/next/image#loader-configuration)

- 开发者模式下默认使用 [squoosh](https://www.npmjs.com/package/@squoosh/lib)
- 生产模式推荐 [sharp](https://www.npmjs.com/package/sharp)

Images are always rendered in such a way as to avoid Cumulative Layout Shift, a Core Web Vital that Google is going to use in search ranking.

##### 元数据

[next/head](https://nextjs.org/docs/api-reference/next/head)

```javascript
import Head from "next/head";
```

```html
<head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</head>
```

[Custom Document](https://nextjs.org/docs/advanced-features/custom-document)

./pages/\_document.js

```javascript
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
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
    );
  }
}

export default MyDocument;
```

getInitialProps 方法形参 context, 如下是该对象具体属性:

- pathname （当前路由, 即页面在/pages 中路径）
- query （Query 字符串从 URL 中解析的对象）
- asPath （在浏览器中真实显示的路径字符串，包括 query 字符串）
- req （HTTP 请求对象 server only)
- res （HTTP 响应对象 server only)
- err （渲染期间遇到错误 Error 对象）

警告

- Document 仅在服务端渲染执行, 类似 onClick 事件委托是不生效的.
- Main 组件以外的 React 组件是不能够被浏览器初始化的。不能增加应用逻辑或者自定义 CSS 在这里，如想添加公共组件请在 App Component 中操作.
- Document 中 [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps) 在客户端过渡时不会被调用。也不再静态优化过程中调用。
- Document 目前不支持 Next.js 数据获取方式 getStaticProps、 getServerSideProps

##### 三方库

Third-party JavaScript refers to any scripts that are added from a third-party source. Usually, third-party scripts are included in order to introduce newer functionality into a site that does not need to be written from scratch, such as analytics, ads, and customer support widgets.

[next/script](https://nextjs.org/docs/api-reference/next/script)

```javascript
import Script from "next/script";

() => (
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
  </Head>
);
```

##### CSS Styling

[style-jsx](https://github.com/vercel/styled-jsx)是 next.js 出品的 css-in-js 方案

针对 JSX 语法提供全局、局部及组件化友好样式，且支持服务端和客户端同时运行
(Full, scoped and component-friendly CSS support for JSX (rendered on the server or the client).)

```javascript
<style jsx>{`
  …
`}</style>
```

该方案是如何处理 css 兼容性如、如何预编译 sass 语法呢？
在 jsx 文件进行转译时，主要通过 babel 插件和抽象语法树：

1. babel 配置文件.babelrc

```json
{
  "plugins": ["styled-jsx/babel"]
}
```

2. babel 针对<style>组件转译类似如下

```javascript
import _JSXStyle from "styled-jsx/style";
export default () => (
  <div className="jsx-123">
    <p className="jsx-123">only this paragraph will get the style :)</p>
    <_JSXStyle id="123">{`p.jsx-123 {color: red;}`}</_JSXStyle>
  </div>
);
```

class 名称唯一性给样式提供了组件级封装同时组件内部做了如下优化：

- 渲染时注入样式
- 组件样式仅注入一次（即使组件被使用多次）
- 自动去掉无用样式
- 服务端渲染样式可追踪

styles.js

```javascript
/* styles.js */
import css from "styled-jsx/css";

// Scoped styles
export const button = css`
  button {
    color: hotpink;
  }
`;

// Global styles
export const body = css.global`
  body {
    margin: 0;
  }
`;

// Resolved styles
export const link = css.resolve`
  a {
    color: green;
  }
`;
// link.className -> scoped className to apply to `a` elements e.g. jsx-123
// link.styles -> styles element to render inside of your component

// Works also with default exports
export default css`
  div {
    color: green;
  }
`;
```

```javascript
import styles, { button, body } from "./styles";

export default () => (
  <div>
    <button>styled-jsx</button>
    <style jsx>{styles}</style>
    <style jsx>{button}</style>
    <style jsx global>
      {body}
    </style>
  </div>
);
```

```javascript
import React from "react";
import css from "styled-jsx/css";

function getLinkStyles(color) {
  return css.resolve`
    a {
      color: ${color};
    }
  `;
}

export default (props) => {
  const { className, styles } = getLinkStyles(props.theme.color);

  return (
    <div>
      <Link className={className}>About</Link>
      {styles}
    </div>
  );
};
```

##### Layout 组件

项目顶级目录下创建 components 目录
layout.js

```javascript
import styles from "./layout.module.scss";

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

layout.module.scss

```scss
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

next.js css modules 方案引入后：

- 自动化生成唯一的 class 名称，无需担心命名冲突
- next.js 自动化代码分割，确保引入 CSS 内容最小
- 自动萃取 css 内容并生成 css 文件

##### 全局样式

```javascript
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

##### 样式建议

- [classnames](https://github.com/JedWatson/classnames)
- PostCSS Config

#### 自定义 postcss

默认自动使用

- Autoprefixer
- Cross-browser Flexbox bugs
- New CSS features are automatically compiled for Internet Explorer 11 compatibility:
  all Property
  Break Properties
  font-variant Property
  Gap Properties
  Media Query Ranges

By default, CSS Grid and Custom Properties (CSS variables) are not compiled for IE11 support.

[browserslist](https://github.com/browserslist/browserslist) 在不同浏览器工具之间共享设定的目标浏览器版本， 比如：

- babel
- postcss
- autoprefixer

[Does Autoprefixer polyfill Grid Layout for IE?](https://github.com/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie)

#### 服务中间件
符合洋葱模型，逐级调用
固定命名方式 _middleware.ts

https://nextjs.org/docs/middleware

##### sentry
next.config.js
```javascript
const {withSentryConfig} = require('@sentry/nextjs');

const moduleExports = (phase, {defaultConfig}) => {
    // next.confg.js 函数式配置方式
}

const sentryWebpackPluginOptions = {
  release: process.env.ENV_NAME || 'development',
  include: './pages',
  ignore: ['node_modules'],
  environment: process.env.ENV_NAME || 'development',
  configFile: path.join(__dirname, './sentry.properties'),
  dryRun: process.env.NODE_ENV === 'development',
  silent: process.env.NODE_ENV === 'development',
  debug: false,
}
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
```

添加如下文件：
- .sengryclic [本地化读取文件，不可提交至代码库。涉及认证信息泄漏]
- sentry.properties [通用化配置]
- sentry.client.config.js
- sentry.server.config.js

_error.js
```javascript
// TODO
```

#### 代码风格检查


- eslint
- stylelint
- prettier
- editorconfg


#### i18n

https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers

- Sub-path Routing
```
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
}
```
内置裁切服务
Next.js 内置支持 CSS 、Sass

#### 网络请求库 swr

SWR is a React Hooks library for data fetching.
SWR名称取自于stale-while-revalidate, 一种缓存失效策略。
popularized by HTTP RFC 5861.
SWR 首先从缓存中获取数据同时发送验证请求，使得最新数据持续更新
```shell
yarn add swr --save
```

#### 模块化
本来程序很小，多是执行独立的脚本任务，随着前端专业化，构建一致性、可复用、可迭代的Web应用。模块化的重要性愈加明显。
因此需要开始考虑提供一种将 JavaScript 程序拆分为可按需导入的单独模块的机制。
Node.js 已经提供这个能力很长时间了，还有很多的 Javascript 库和框架 已经开始了模块的使用（例如， CommonJS 和基于 AMD 的其他模块系统 如 RequireJS, 以及最新的 Webpack 和 Babel

好消息是，最新的浏览器开始原生支持模块功能了。这会是一个好事情 — 浏览器能够最优化加载模块，使它比使用库更有效率：使用库通常需要做额外的客户端处理。

原生JavaScript模块中, 扩展名 .mjs 非常重要，因为使用 MIME-type 为javascript/esm 来导入文件(其他的JavaScript 兼容 MIME-type 像 application/javascript 也可以), 它避免了严格的 MIME 类型检查错误，像 "The server responded with a non-JavaScript MIME type".
除此之外,  .mjs 的扩展名很明了(比如这个就是一个模块，而不是一个传统 JavaScript文件)，还能够和其他工具互相适用. 看这个 Google's note for further detail

```html
<script type="module" src="main.mjs"></script>
<script nomodule defer src="fallback.js"></script>

```


ES module

import
- 在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用。
- 还有一个类似函数的动态 import()，它不需要依赖 type="module" 的script标签
- 使用静态 import 更容易从代码静态分析工具和 tree shaking 中受益
- script 标签中使用 nomodule 属性，可以确保向后兼容

````javascript
// 仅为副作用而导入一个模块, 这将运行模块中的全局代码, 但实际上不导入任何值。
import '/modules/my-module.js';
````
静态导入，标准用法的import导入的模块是静态的，会使所有被导入的模块，在加载时就被编译。
动态导入，根据条件导入模块或者按需导入模块，这时你可以使用动态导入代替静态导入。

```javascript
(async () => {
  if (somethingIsTrue) {
    const { default: myDefault, foo, bar } = await import('/modules/my-module.js');
  }
})();
```

export
- 语句用于从模块中导出实时绑定的函数、对象或原始值,其他程序可以通过 import 语句使用它们
- 被导出的绑定值依然可以在本地进行修改
- 在使用import进行导入时，这些绑定值只能被导入模块所读取,但在export导出模块中对这些绑定值进行修改，所修改的值也会实时地更新。
- 无论是否声明，导出的模块都处于严格模式

两种导出方式：
- 命名导出
- 默认导出
```javascript
// --- 命名导出 ---
// 导出事先定义的特性
export { myFunction ，myVariable };

// 导出单个特性（可以导出var，let，
//const,function,class）
export let myVariable = Math.sqrt(2);
export function myFunction() { ... };
// --- 默认导出 ---

// 导出事先定义的特性作为默认值
export { myFunction as default };

// 导出单个特性作为默认值
export default function () { ... }
export default class { .. }

```
联合使用
```javascript
export { default as DefaultExport } from 'bar.js';
```





