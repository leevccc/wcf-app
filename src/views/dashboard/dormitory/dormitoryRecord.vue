<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary">新建</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-table
      row-key="id"
      :loading="loading"
      :data="tableData"
      :bordered="false"
      :pagination="false"
    >
      <template #columns>
        <a-table-column
          title="Id"
          data-index="id"
          :width="100"
        ></a-table-column>
        <a-table-column
          title="宿舍"
          data-index="dormitory"
          :width="100"
        ></a-table-column>
        <a-table-column title="采集日期" data-index="date" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.date) }}
          </template>
        </a-table-column>
        <a-table-column title="账单日期" data-index="billDate" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.billDate) }}
          </template>
        </a-table-column>
        <a-table-column
          title="读数: 水"
          data-index="water"
          :width="120"
        ></a-table-column>
        <a-table-column
          title="读数: 电"
          data-index="electricity"
          :width="120"
        ></a-table-column>
        <a-table-column title="操作"></a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { formatDate } from '@/utils/date';
  import { ref } from 'vue';
  import { DormitoryRecordState } from '@/store/modules/dormitory/types';
  import { getDormitoryRecord } from '@/api/dormitory';

  const { loading, setLoading } = useLoading(true);
  const tableData = ref<DormitoryRecordState[]>([]);
  setLoading(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getDormitoryRecord();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'DormitoryRecord',
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
