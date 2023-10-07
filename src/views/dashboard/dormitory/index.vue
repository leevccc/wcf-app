<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="宿舍管理">
      <a-tabs default-active-key="2" lazy-load @change="handleTabChange">
        <a-tab-pane key="1" title="宿舍列表">
          <DormitoryList />
        </a-tab-pane>
        <a-tab-pane key="2" title="水电记录">
          <DormitoryRecord />
        </a-tab-pane>
        <a-tab-pane key="3" title="人员管理">
          <DormitoryOccupancy />
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

<script lang="ts" setup>
  import DormitoryRecord from '@/views/dashboard/dormitory/dormitoryRecord.vue';
  import DormitoryList from '@/views/dashboard/dormitory/DormitoryList.vue';
  import DormitoryOccupancy from '@/views/dashboard/dormitory/DormitoryOccupancy.vue';

  const handleTabChange = (key: string | number) => {
    window.console.log('tabChange', key);
  };
</script>

<script lang="ts">
  export default {
    name: 'Dormitory',
  };
</script>

<style lang="less" scoped></style>
