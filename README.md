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

## 自建

自建版本无v3环境

```sh
npm init
```

> 输入版本时，需要标记4.1.0,其他随意

- 依赖

```sh
npm install yarn@1.19.1 -g
yarn add yunzai react-puppeteer react puppeteer yz-system -W
```

- src/main.js

```js
import { createLogin, Client, Processor, Loader } from 'yunzai'
const initialize = () => {
  Processor.install()
  Loader.load()
}
const start = async () => {
  await createLogin()
  const T = await Client.run()
  if (T) {
    Bot.on('system.online', initialize)
  } else {
    initialize()
  }
}
setTimeout(start, 0)
```

- yunzai.config.js

```js
import { defineConfig } from 'yunzai'
export default defineConfig({
  applications: ['yz-system']
})
```

- .puppeteerrc.cjs

```js
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = require('react-puppeteer/.puppeteerrc')
```

- 运行

```sh
node src/main.js
```

```sh
node src/main.js --relogin
```

- 后台运行

```sh
yarn add pm2 -W
```

- pm2.config.cjs

```js
/**
 * @type {{ apps: import("pm2").StartOptions[] }}
 */
module.exports = require('yunzai/pm2')
```

```sh
npx pm2 startOrRestart pm2.config.cjs
```
