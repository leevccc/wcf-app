<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="newDataClick">登记</a-button>
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
          title="用户"
          data-index="user"
          :width="100"
        ></a-table-column>
        <a-table-column
          title="宿舍ID"
          data-index="roomNumber"
          :width="100"
        ></a-table-column>
        <a-table-column title="搬入" data-index="checkInDate" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.checkInDate) }}
          </template>
        </a-table-column>
        <a-table-column title="搬出" data-index="checkOutDate" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.checkOutDate) }}
          </template>
        </a-table-column>
        <a-table-column title="操作"></a-table-column>
      </template>
    </a-table>
  </div>
  <DormitoryOccupancyForm ref="dormitoryOccupancyFormRef" @reload="fetchData" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { DormitoryOccupancyState } from '@/store/modules/dormitory/types';
  import useLoading from '@/hooks/loading';
  import { formatDate } from '@/utils/date';
  import { getDormitoryOccupancy } from '@/api/dormitory';
  import DormitoryOccupancyForm from '@/views/dashboard/dormitory/DormitoryOccupancyForm.vue';

  const { loading, setLoading } = useLoading(true);
  const tableData = ref<DormitoryOccupancyState[]>([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getDormitoryOccupancy();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const dormitoryOccupancyFormRef = ref<any>();
  const newDataClick = () => {
    dormitoryOccupancyFormRef.value.dormitoryOccupancyList = tableData;
    dormitoryOccupancyFormRef.value.initial();
  };
</script>

<script lang="ts">
  export default {
    name: 'DormitoryOccupancy',
  };
</script>

<style lang="less" scoped></style>
