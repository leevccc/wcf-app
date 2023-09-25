<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="宿舍管理">
      <a-tabs default-active-key="2">
        <a-tab-pane key="1" title="宿舍列表">
          Content of Tab Panel 1
        </a-tab-pane>
        <a-tab-pane key="2" title="水电记录">
          Content of Tab Panel 2
        </a-tab-pane>
        <a-tab-pane key="3" title="人员管理">
          Content of Tab Panel 3
        </a-tab-pane>
        <a-tab-pane key="4" title="宿舍费用">
          Content of Tab Panel 4
        </a-tab-pane>
        <a-tab-pane key="5" title="人均分摊">
          Content of Tab Panel 5
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
  export default {
    name: 'Dormitory',
  };
</script>

<style lang="less" scoped></style>
