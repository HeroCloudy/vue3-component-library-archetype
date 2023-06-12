# vue3-component-library-archetype

基于 Vue3 + Vite 独立组件库脚手架，可在此基础上定制化开发企业级或个人的组件库。

脚手架采用 monorepo 风格，使用 pnpm 作为包管理工具。

## 组件库脚手架内容

- 组件库开发、打包、发布
- 组件库文档编写、打包、一套代码编写和演示 Demo
- 快速创建组件命令行 cli
- 组件库搭建的 example 演示

## 组件库脚手架技术栈

- Vite 4
- Vue 3
- TypeScript
- Vitepress 1.0
- ESLint

## 使用说明

#### 克隆代码到本地：

```shell
git clone git@github.com:HeroCloudy/vue3-component-library-archetype.git
```

#### 安装依赖

如果您没有安装 pnpm，需要先按照 pnpm

```shell
npm install -g pnpm
```

安装依赖：

```shell
pnpm i
```

#### 本地开发

在 example 中开发组件，使用命令：

```shell
pnpm run dev:dev
```

访问地址为 http://localhost:3000/

在组件库文档中开发组件，使用命令：

```shell
pnpm run docs:dev
```

访问地址为 http://localhost:3100/

#### 创建新组件

```shell
pnpm run gen:component
```
按照提示输入组件名称、组件中文名称、组件类型（.tsx 或 .vue）

#### 构建文档
```shell
pnpm run build:docs
```
打包构建后的文件位于 _docs/.vitepress/dist_ 目录

#### 构建 example
```shell
pnpm run build:dev
```
打包构建后的文件位于 _dist_ 目录

#### 发布组件库

组件库打包：

```shell
pnpm run build:lib
```

在发布 npm 前可以在本地私服进行测试。
启动本地私服：
```shell
pnpm run start:verdaccio
```
启动成功后在浏览器中访问 http://localhost:4873/

如果初次使用，需要创建用户。

发布组件库到本地私服中：
```shell
pnpm run pub:local
```


## 组件库命令说明

组件库的命令入口均在根目录的 _package.json_ 中的 _scripts_ 中。由于采用了 monorepo 的方式，大多命令的实现都在各自的模块中。

所有命令如下：

```
- dev:dev
- dev:uat
- dev:prod
- build:dev
- build:uat
- build:prod
- preview:example
- build:lib
- docs:dev
- docs:build
- docs:preview
- gen:component
- start:verdaccio
- pub:local
```

#### pnpm run dev:dev

本地开发 example，使用 dev 环境配置，访问地址为 http://localhost:3000/

#### pnpm run dev:uat

本地开发 example，使用 uat 环境配置，访问地址为 http://localhost:3000/

#### pnpm run dev:prod

本地开发 example，使用 prod 环境配置，访问地址为 http://localhost:3000/

#### pnpm run build:dev

打包 dev 环境 example，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run build:uat

打包 uat 环境 example，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run build:prod

打包 prod 环境 example，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run preview:example

预览打包后的 example，访问地址为：http://localhost:4173/

#### pnpm run build:lib

打包组件库，打包生成的文件位于项目根目录的 _lib_ 目录

#### pnpm run docs:dev

本地开发组件库文档，访问地址为：http://localhost:3100/

#### pnpm run docs:build

组件库文档打包，打包生成的文件位于项目根目录下的 _docs/.vitepress/dist_ 目录

#### pnpm run docs:preview

预览打包后的组件库文档，访问地址为：http://localhost:4173/

#### pnpm run gen:component

快速创建新组件。依次输入组件名、组件描述（中文名称）、组件类型（tsx \ vue）即可自动生成组件并完成配置。

使用该命令可避免组件开发人员分散精力到各种配置、基础目录和文件的创建中，可以让其聚焦于组件本身的开发。

#### pnpm run start:verdaccio

启动 verdaccio。 本地开发时，使用 verdaccio 作为测试使用的本地 npm 私服。
使用该命令启动 verdaccio 私服，启动成功后在浏览器中访问 http://localhost:4873/

如果初次使用，需要创建用户，可以搜索 _verdaccio_，查看其具体使用。

#### pnpm run pub:local

发布组件库到本地私服。


---
***程序员优雅哥***

十年程序员，呆过央企外企私企，做过前端后端架构，分享vue、Java等前后端技术和架构

在公众号上随时更新前后端技术文章及企业级实战项目。可关注公众号程序员优雅哥查看。

与时间赛跑，每天都在进步！！

If you have any questions, please contact me (heroyyg@126.com).

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h5anivz6cmj20ca0c6dgm.jpg" alt="程序员优雅哥" style="width: 200px;" />

yycoder
