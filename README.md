# vitepress-plugin-gitalk

Provide Github Issue comment to your documentation site.

Read this in other languages: English | [简体中文](./README.zh.md)

## Install

```sh
> npm i vitepress-plugin-gitalk
```

or

```sh
> yarn add vitepress-plugin-gitalk
```

## Usage

```typescript
// .vitepress/config.ts
import { defineConfig } from "vitepress";
import { GitalkPlugin, GitalkOptions } from "vitepress-plugin-gitalk";

const options: GitalkOptions = {
  clientID: 'GitHub Application Client ID',
  clientSecret: 'GitHub Application Client Secret',
  // The repository of store comments
  repo: 'GitHub repo',
  owner: 'GitHub repo owner',
  admin: [
    'GitHub repo owner and collaborators, only these guys can initialize github issues'
  ],
  // Ensure uniqueness and length less than 50
  id: location.pathname,
  // Facebook-like distraction free mode
  distractionFreeMode: false,
};

export default defineConfig({
  vite: {
    plugins: [
      GitalkPlugin(options),
    ],
  },
});
```

## Mustache

How to customize the `id` option of gitalk?

```typescript
// .vitepress/config.ts
import { defineConfig } from "vitepress";
import { GitalkPlugin } from "vitepress-plugin-gitalk";

export default defineConfig({
  vite: {
    plugins: [
      GitalkPlugin({
        id: '{{location.pathname}}',
      }),
    ],
  },
});
```

For dynamic parameters, you can use Mustache syntax for dynamic parsing.

## Frontmatter

```yaml
title: Docs with VitePress
comments: false
```

You can add `comments` attribute to YAML frontmatter close the comment.

## Options

You can [click here](https://github.com/gitalk/gitalk#options) to view the complete Options.
