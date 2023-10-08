<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="newDormitoryClick">新建</a-button>
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
        <a-table-column title="地址" data-index="address"></a-table-column>
        <a-table-column
          title="宿舍"
          data-index="roomNumber"
          :width="100"
        ></a-table-column>
        <a-table-column
          title="水价"
          data-index="waterPrice"
          :width="100"
        ></a-table-column>
        <a-table-column
          title="电价"
          data-index="electricityPrice"
          :width="100"
        ></a-table-column>
        <a-table-column
          title="租赁日期"
          data-index="leaseStartDate"
          :width="120"
        >
          <template #cell="{ record }">
            {{ formatDate(record.leaseStartDate) }}
          </template>
        </a-table-column>
        <a-table-column title="终止日期" data-index="leaseEndDate" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.leaseEndDate) }}
          </template>
        </a-table-column>
        <a-table-column title="操作"></a-table-column>
      </template>
    </a-table>
  </div>
  <DormitoryForm ref="dormitoryFormRef" @reload="fetchData"></DormitoryForm>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { formatDate } from '@/utils/date';
  import { ref } from 'vue';
  import { DormitoryState } from '@/store/modules/dormitory/types';
  import { getDormitory } from '@/api/dormitory';
  import DormitoryForm from '@/views/dashboard/dormitory/list/form.vue';

  const { loading, setLoading } = useLoading(true);
  const tableData = ref<DormitoryState[]>([]);
  setLoading(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getDormitory();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const dormitoryFormRef = ref<any>();
  const newDormitoryClick = () => {
    dormitoryFormRef.value.initial();
  };
</script>

<script lang="ts">
  export default {
    name: 'DormitoryList',
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
