# react-create-app

它是一个 react 脚手架工具,类似Vue的 vue-cli

虽然官网 npm 上的说明不足,但是 guthub 上还是说的挺明白的。

附上地址： https://github.com/facebook/create-react-app

## 一、全局安装

npm i create-react-app -g 

## 二、查看帮助

create-react-app --h

他会告诉你如何使用命令行创建 reactapp 。

以下就是它输出的结果:

Please specify the project directory:
  create-react-app <project-directory>

For example:
  create-react-app my-react-app

Run create-react-app --help to see all options.

## 三、创建app

create-react-app my-app

这样就创建好了一个未安装 node_modules 的 app 。

## 四、安装依赖

使用 
```bash
npm i 
```
来安装依赖。

在中国这些包的安装会异常耗时，有时甚至会失败，原因是因为npm访问的是外国服务器经过了多次转发，以及需要经过防火长城(Great Firewall of China)的过滤。

解决方案有很多，提供一个 nrm 给大家用。

[nrm](https://github.com/PsChina/angularJS/blob/master/nrm/nrm.md) 是一个源管理工具

## 五、打开 webpack 配置项

安装完依赖以后我们会发现它与 vue-cli 不一样看不到任何与 webpack 相关的配置文件

查阅资料后发现 webpack 的配置项需要命令行打开 

细心的朋友可能已经在 package.json 内看到了 4 个命令  

```json
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test --env=jsdom",
"eject": "react-scripts eject"
```
前三个分别是运行在开发环境、发布前打包和测试。

第四个就是用于打开 webpack 配置项的命令。

所以我们运行

```bash
npm run eject
```

如果遇到报错

Remove untracked files, stash or commit any changes, and try again.

解决方案是：

```bash
git add .
git commit -am "Save before ejecting"
```
然后再次尝试 npm run eject 。

## 六、配置 eslint

我们可以通过 airbnb 来快速为 react 项目配置 eslint 规范。

```bash
npm install --save-dev eslint-config-airbnb 
```

以上命令安装了已经包括了以下三个插件：
```
eslint-plugin-import
eslint-plugin-react 
eslint-plugin-jsx-a11y
```

安装好所需的包以后我们还需要新建 .eslintrc

.eslintrc

```json
{
    "extends": "airbnb",
}
```

在 .eslintrc 中添加 airbnb 约束.

有几个不合理的地方我们可以修改一下

比如:

1 airbnb 默认必须使用 function 定义无状态组件 代替所有组件，这显然是不合理的。

所以我们在自己的规则中关闭这个规则:

"react/prefer-stateless-function":"off",

2 airbnb 默认不能再 .js 文件中写 jsx 。 我们需要关闭。

"react/jsx-filename-extension":"off",

3 airbnb 默认不能使用为定义的变量，我们改为警告。

"no-undef":"warn"


所以最后 .eslintrc 的样子是:

.eslintrc
```json
{
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension":"off",
        "react/prefer-stateless-function":"off",
        "no-undef":"warn"
    }
}
```

eslint 提示级别

0 "off" 关闭

1 "warn" 警告

2 "error" 错误

## 七、更改打包路径

## 八、设置proxy代理