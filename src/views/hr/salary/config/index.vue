<template>
  <div class="container">
    <a-table
      row-key="id"
      :loading="loading"
      :data="tableData"
      :bordered="false"
      :pagination="false"
    >
      <template #columns>
        <a-table-column title="部门" data-index="department" :width="100" />
        <a-table-column title="员工" data-index="user" :width="100" />
        <a-table-column title="数据" data-index="count" :width="100" />
        <a-table-column title="操作">
          <template #cell="record">
            <a-button type="text" size="mini" @click="showDetails(record)">
              详情
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { SalaryConfigStates } from '@/store/modules/salary/types';
  import { getSalaryConfig } from '@/api/salary';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<SalaryConfigStates[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getSalaryConfig();
      tableData.value = data;
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  const showDetails = (data: SalaryConfigStates) => {
    window.console.log(data);
  };
</script>

<script lang="ts">
  export default {
    name: 'SalaryConfig',
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
