<h1 align="center">ns-import </h1>
<p>
  <a href="https://www.npmjs.com/package/ns-import" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/ns-import.svg">
  </a>
  <a href="https://github.com/CaoMeiYouRen/ns-import/actions?query=workflow%3ARelease" target="_blank">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/CaoMeiYouRen/ns-import/release.yml?branch=master">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue.svg" />
  <a href="https://github.com/CaoMeiYouRen/ns-import#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/ns-import/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/ns-import/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>


> Import/Require with namespace. 基于命名空间的 import 和 require。
>
> 主要代码和灵感参考自：https://github.com/shigma/ns-require 
>
> 在此表示感谢。

## 🏠 主页

[https://github.com/CaoMeiYouRen/ns-import#readme](https://github.com/CaoMeiYouRen/ns-import#readme)

## 📦 依赖要求


- node >=16

## 🚀 安装

```sh
npm install ns-import
```

## 👨‍💻 使用

**注意：ES modules  和 CommonJS 两种使用方法不可混用！ **

**本项目仅适用于 NodeJS 端！无法在浏览器中运行！**

### 在 ES modules 中使用

```ts
// Basic Usage
import { ns } from 'ns-import'

const scope = ns({
  namespace: 'awesome',
  prefix: 'plugin',
})

// 注意动态 import 需要配合 await 使用
await scope.import('foo')    // will resolve to `awesome-plugin-foo`
await scope.import('@foo/bar')   // will resolve to `@foo/awesome-plugin-bar`

// With Official Scope
import { ns } from 'ns-import'

const scope = ns({
  namespace: 'awesome',
  prefix: 'plugin',
  official: 'scope',
})

// 注意动态 import 需要配合 await 使用
await scope.import('foo')    // will resolve to `@scope/plugin-foo`
       						 // and then `awesome-plugin-foo`
await scope.import('@foo/bar') // will resolve to `@foo/awesome-plugin-bar`
```

### 在 CommonJS 中使用

```ts
// Basic Usage
const { ns } = require('ns-import')
const scope = ns({
  namespace: 'awesome',
  prefix: 'plugin',
})
scope.require('foo')        // will resolve to `awesome-plugin-foo`
scope.require('@foo/bar')   // will resolve to `@foo/awesome-plugin-bar`

// With Official Scope
const { ns } = require('ns-import')
const scope = ns({
  namespace: 'awesome',
  prefix: 'plugin',
  official: 'scope',
})

scope.require('foo')        // will resolve to `@scope/plugin-foo`
                            // and then `awesome-plugin-foo`
scope.require('@foo/bar')   // will resolve to `@foo/awesome-plugin-bar`

```

## 🛠️ 开发

```sh
npm run dev
```

## 🔧 编译

```sh
npm run build
```

## 🔍 Lint

```sh
npm run lint
```

## 💾 Commit

```sh
npm run commit
```


## 👤 作者


**CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd/](https://blog.cmyr.ltd/)

* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)


## 🤝 贡献

欢迎 贡献、提问或提出新功能！<br />如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/ns-import/issues). <br/>贡献或提出新功能可以查看[contributing guide](https://github.com/CaoMeiYouRen/ns-import/blob/master/CONTRIBUTING.md).

## 💰 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=CaoMeiYouRen/ns-import&type=Date)](https://star-history.com/#CaoMeiYouRen/ns-import&Date)

## 📝 License

Copyright © 2023 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/ns-import/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [cmyr-template-cli](https://github.com/CaoMeiYouRen/cmyr-template-cli)_
