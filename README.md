# react-music-player

A music player by React, open it at https://rectsuly.github.io/react-music-player/

![首页](/player.png)

## 说明

技术栈采用react(16.x) + react-router-dom(4.x) + ES6 + create-react-app

## 如何运行

#### 1.将项目克隆到本地，cd到react-music-player

```bash
git clone git@github.com:rectsuly/react-music-player.git
cd react-music-player
```

#### 2.安装依赖

```bash
npm install
```

#### 3. 暴露配置文件

create-react-app生成的项目，看不到webpack相关的配置文件，需要先暴露出来，使用如下命令即可：

```bash
npm run eject
```

** 安装less-loader 和 less **

```bash
npm install less-loader less --save
```

** 修改webpack配置 **

修改`webpack.config.dev.js`和`webpack.config-prod.js`配置文件

+ `test:/\.css$/` 改为 `/\.(css|less)$`
+ `test:/\.css$/` 的 `use` 数组配置增加 `less-loader`：

```javascript
{
  loader:require.resolve('less-loader')
}
```

#### 4.执行

```bash
npm run start
// npm run build (打包)
```

#### 4.打开浏览器浏览 `http://localhost:3000/`

## GitHub Page 发布

#### 1.首先在package.json配置文件中加入一句："homepage":"./"，然后进行打包：`npm run build`

#### 2.将`build`提交到`Git`仓库：

```bash
git add .
git add -f build
git commit -m "release project"
git push origin master
```

#### 3.推送到`GitHub Page`:

```bash
git subtree push --prefix=build origin gh-pages
```

