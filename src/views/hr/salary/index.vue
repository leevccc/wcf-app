<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="工资管理">
      <a-tabs default-active-key="2" lazy-load>
        <a-tab-pane key="1" title="工资设置">
          <salary-config></salary-config>
        </a-tab-pane>
        <a-tab-pane key="2" title="工资报表"> 1 </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import SalaryConfig from '@/views/hr/salary/config/index.vue';
</script>

<script lang="ts">
  export default {
    name: 'Salary',
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
