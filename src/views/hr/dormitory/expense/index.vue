<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="generateClick">生成</a-button>
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
        <a-table-column title="Id" data-index="id"></a-table-column>
        <a-table-column title="账单日期" data-index="date" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.billMonth) }}
          </template>
        </a-table-column>
        <a-table-column title="地址" data-index="address"></a-table-column>
        <a-table-column title="宿舍" data-index="roomNumber"></a-table-column>
        <a-table-column title="人数" data-index="occupants"></a-table-column>
        <a-table-column
          title="上月读数"
          data-index="lastMonthWaterReading"
        ></a-table-column>
        <a-table-column
          title="本月读数"
          data-index="currentMonthWaterReading"
        ></a-table-column>
        <a-table-column title="用水" data-index="waterUsage"></a-table-column>
        <a-table-column title="单价" data-index="waterPrice"></a-table-column>
        <a-table-column title="水费" data-index="waterCost"></a-table-column>
        <a-table-column
          title="上月读数"
          data-index="lastMonthElectricityReading"
        ></a-table-column>
        <a-table-column
          title="本月读数"
          data-index="currentMonthElectricityReading"
        ></a-table-column>
        <a-table-column
          title="用电"
          data-index="electricityUsage"
        ></a-table-column>
        <a-table-column
          title="单价"
          data-index="electricityPrice"
        ></a-table-column>
        <a-table-column
          title="电费"
          data-index="electricityCost"
        ></a-table-column>
        <a-table-column title="总费用" data-index="totalCost"></a-table-column>
      </template>
    </a-table>
  </div>
  <dormitory-expense-form ref="dormitoryExpenseFormRef" @reload="fetchData" />
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { DormitoryExpenseState } from '@/store/modules/dormitory/types';
  import { formatDate } from '@/utils/date';
  import { getDormitoryExpense } from '@/api/dormitory';
  import DormitoryExpenseForm from '@/views/hr/dormitory/expense/form.vue';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<DormitoryExpenseState[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getDormitoryExpense();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const dormitoryExpenseFormRef = ref<any>();
  const generateClick = () => {
    dormitoryExpenseFormRef.value.initial(tableData.value);
  };
</script>

<script lang="ts">
  export default {
    name: 'DormitoryExpense',
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
