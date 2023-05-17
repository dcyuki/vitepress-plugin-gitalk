import type Gitalk from 'gitalk';
import { Plugin } from 'vite';

const fileRegex = /VPDoc.vue$/;

function addComponent(src: string): string {
  return src
    .replace(
      /(\<slot name\=\"doc-after\" \/\>)/,
      `
        $1
        <Gitalk />
      `
    )
    .replace(
      /(from 'vue')/,
      `
        $1
        import Gitalk from 'vitepress-plugin-gitalk/Gitalk.vue'
      `
    );
}

export interface GitalkOptions extends Gitalk.GitalkOptions {}

export function GitalkPlugin(options: GitalkOptions): Plugin {
  const virtualModuleId = 'virtual:gitalk';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-gitalk',
    enforce: 'pre',

    transform(src, id) {
      if (!fileRegex.test(id)) {
        return;
      }
      return {
        code: addComponent(src),
      };
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id) {
      if (id !== resolvedVirtualModuleId) {
        return;
      }
      return `
        export const options = ${JSON.stringify(options)};
      `;
    },
  };
}
