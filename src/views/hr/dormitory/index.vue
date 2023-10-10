<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="宿舍管理">
      <a-tabs default-active-key="2" lazy-load>
        <a-tab-pane key="1" title="宿舍列表">
          <dormitory-list />
        </a-tab-pane>
        <a-tab-pane key="2" title="水电记录">
          <dormitory-record />
        </a-tab-pane>
        <a-tab-pane key="3" title="人员管理">
          <dormitory-occupancy />
        </a-tab-pane>
        <a-tab-pane key="4" title="宿舍费用">
          <dormitory-expense />
        </a-tab-pane>
        <a-tab-pane key="5" title="人均分摊">
          <dormitory-individual-expense />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import DormitoryRecord from '@/views/hr/dormitory/record/index.vue';
  import DormitoryList from '@/views/hr/dormitory/list/index.vue';
  import DormitoryOccupancy from '@/views/hr/dormitory/occupancy/index.vue';
  import DormitoryExpense from '@/views/hr/dormitory/expense/index.vue';
  import DormitoryIndividualExpense from '@/views/hr/dormitory/individual/index.vue';
</script>

<script lang="ts">
  export default {
    name: 'Dormitory',
  };
</script>

<style lang="less" scoped></style>
