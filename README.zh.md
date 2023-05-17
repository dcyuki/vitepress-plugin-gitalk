# vitepress-plugin-gitalk

向你的文档网站提供 Github Issue 评论区。

使用其他语言阅读：[English](./README.md) | 简体中文

## 安装

```sh
> npm i vitepress-plugin-gitalk
```

或者

```sh
> yarn add vitepress-plugin-gitalk
```

## 使用

```typescript
// .vitepress/config.ts
import { defineConfig } from "vitepress";
import { GitalkPlugin, GitalkOptions } from "vitepress-plugin-gitalk";

const options: GitalkOptions = {
  clientID: 'GitHub Application Client ID',
  clientSecret: 'GitHub Application Client Secret',
  repo: 'GitHub repo',
  owner: 'GitHub repo owner',
  admin: [
    'GitHub repo owner and collaborators, only these guys can initialize github issues'
  ],
};

export default defineConfig({
  vite: {
    optimizeDeps: {
      include: ['gitalk'],
    },
    plugins: [
      GitalkPlugin(options),
    ],
  },
});
```

## Mustache

如何自定义 gitalk 的 `id` 选项？

```typescript
// .vitepress/config.ts
import { defineConfig } from "vitepress";
import { GitalkPlugin } from "vitepress-plugin-gitalk";

export default defineConfig({
  vite: {
    optimizeDeps: {
      include: ['gitalk'],
    },
    plugins: [
      GitalkPlugin({
        id: '{{location.pathname}}',
      }),
    ],
  },
});
```

对于动态参数，可以使用 Mustache 语法做动态解析。

## Frontmatter

```yaml
title: Docs with VitePress
comments: false
```

你可以在 YAML frontmatter 添加 `comments` 属性来关闭评论。

## 配置项

你可以 [点击这里](https://github.com/gitalk/gitalk#options) 查看完整的配置项。
