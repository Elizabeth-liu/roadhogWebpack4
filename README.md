# roadhogWebpack4

使用 webpack4 来代替 roadhong，构建 ant-pro 项目，可以大幅度提高速度

## 接入方式

1. 将 package.json 中 devDependencies 中的依赖添加到自己的项目中，并删除项目中的 roadhog 依赖
2. 运行 npm install 推荐使用(cnpm install 速度更快,如果不知道自行百度 cnpm)
3. 将.babelrc（babel 配置）、.eslintrc（eslint 配置）、.stylelintrc（stylelint 配置）复制到项目根目录
4. 将 config.dll.js（打包第三方依赖生成 dll，不明白的自行去百度）、webpack.config.development.js（开发环境配置）、webpack.config.production.js（生产环境配置）复制到项目根目录
5. 运行 buildDll 命令生成 dll
6. 开发时运行 start:local 会启动 webpack-dev-server 、开发环境打包运行 webpack-build-development、生产环境打包运行 webpack-build-production

## 增加功能

感谢大佬，在大佬的基础上略做修改，满足我如下需求：

- 修改 js 文件能够 hmr
- 修改 less 文件能够 hmr
- 能直接在浏览器输入任意路由显示对应页面而不是 404
- 因为我是前后端同时开发，添加了 proxy 代理
- 解决控制台会报错 `_dll_vendors is not defined`，添加 `AddAssetHtmlPlugin` 将 dll 文件引入到 index.html
