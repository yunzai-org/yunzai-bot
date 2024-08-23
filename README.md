# YZ-NEXT-PE

Yunzai-Bot Next PE 是 Next 库的纯净版

[☞点击阅读文档了解更多](https://yunzai-org.github.io/docs/)

> Code https://github.com/yunzai-org/yunzai-next

## 安装

必备条件`Chrome`、`Node.js@18`、`Git`、`Redis-6.2`

```sh
git clone --depth=1 https://github.com/yunzai-org/yunzai-bot.git
```

```sh
cd yunzai-bot
```

```sh
# 国内镜像，已安装可忽视
npm config set registry https://registry.npmmirror.com
```

```sh
# yarn 不能使用2.x版本，它无法使用link
npm install yarn@1.19.1 -g
yarn --ignore-engines
```

```sh
# 运行
yarn app
```
