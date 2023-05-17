<script setup lang="ts">
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import { useData, useRoute } from 'vitepress';
import { onMounted, ref, watch } from 'vue';

const data = useData();
const route = useRoute();
const gitalkRef = ref<HTMLElement | null>(null);

const emptyNode = (node: HTMLElement): void => {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild!);
  }
};

const parseMustache = (value: string) => {
  const regex = /{{\s*(.+)\s*}}/g;

  return value.replace(regex, (_, param): string => {
    try {
      if (param === 'value') {
        throw new ReferenceError('value is not defined');
      }
      const result = eval(param);

      return result;
    } catch {
      return 'undefined';
    }
  });
};

const getOptions = async () => {
  const { options } = await import('virtual:gitalk');
  return JSON.parse(parseMustache(JSON.stringify(options)));
};

const initGitalk = async (): Promise<void> => {
  emptyNode(gitalkRef.value!);

  if (location.pathname === '/' || data.frontmatter.value.comments === false) {
    return;
  }
  const options = await getOptions();

  new Gitalk(options).render(gitalkRef.value!);
};

onMounted(() => {
  initGitalk();
});

watch(
  () => route.path,
  () => {
    initGitalk();
  }
);
</script>

<template>
  <div ref="gitalkRef"></div>
</template>

<style>
.gt-header-textarea {
  background-color: var(--vp-sidebar-bg-color) !important;
}

.gt-btn-preview {
  /* TODO ／人◕ ‿‿ ◕人＼ */
  /* color: var(--vp-c-brand) !important; */
  /* border: 1px solid var(--vp-c-brand) !important; */
  background-color: var(--vp-c-bg) !important;
}
</style>
