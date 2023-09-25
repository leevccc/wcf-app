<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item
      v-for="item in router.currentRoute.value.matched"
      :key="item.name"
    >
      <a-link
        v-if="
          item.name !== router.currentRoute.value.name &&
          item.children.length === 0
        "
        @click="$router.push({ name: item.name })"
      >
        {{ item.name }}
      </a-link>
      <span v-else>
        {{ item.name }}
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import router from '@/router';
</script>

<style scoped lang="less">
  .container-breadcrumb {
    margin: 16px 0;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>
