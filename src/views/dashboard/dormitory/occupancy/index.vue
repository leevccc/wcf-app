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
          title="宿舍"
          data-index="dormitory"
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
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button
              v-if="isEmptyString(record.checkOutDate)"
              type="primary"
              size="small"
              @click="checkOutClick(record)"
            >
              搬出
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
  <DormitoryOccupancyForm ref="dormitoryOccupancyFormRef" @reload="fetchData" />
  <d-occupancy-check-out-form
    ref="dOccupancyCheckOutFormRef"
    @reload="fetchData"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { DormitoryOccupancyState } from '@/store/modules/dormitory/types';
  import useLoading from '@/hooks/loading';
  import { formatDate } from '@/utils/date';
  import { getDormitoryOccupancy } from '@/api/dormitory';
  import DormitoryOccupancyForm from '@/views/dashboard/dormitory/occupancy/form.vue';
  import DOccupancyCheckOutForm from '@/views/dashboard/dormitory/occupancy/checkOutForm.vue';
  import { isEmptyString } from '@/utils/string';

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
    dormitoryOccupancyFormRef.value.initial(tableData.value);
  };

  const dOccupancyCheckOutFormRef = ref<any>();
  const checkOutClick = (data: any) => {
    dOccupancyCheckOutFormRef.value.initial(data);
  };
</script>

<script lang="ts">
  export default {
    name: 'DormitoryOccupancy',
  };
</script>

<style lang="less" scoped></style>
