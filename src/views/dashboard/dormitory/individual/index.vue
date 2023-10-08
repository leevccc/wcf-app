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
        <a-table-column title="Id" data-index="id"></a-table-column>
        <a-table-column title="账单日期" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.billMonth) }}
          </template>
        </a-table-column>
        <a-table-column title="地址" data-index="address"></a-table-column>
        <a-table-column title="宿舍" data-index="roomNumber"></a-table-column>
        <a-table-column title="用户" data-index="user"></a-table-column>
        <a-table-column title="搬进" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.checkInDate) }}
          </template>
        </a-table-column>
        <a-table-column title="搬出" :width="120">
          <template #cell="{ record }">
            {{ formatDate(record.checkOutDate) }}
          </template>
        </a-table-column>
        <a-table-column
          title="实住/天"
          data-index="daysResided"
        ></a-table-column>
        <a-table-column title="补贴" data-index="subsidy"></a-table-column>
        <a-table-column
          title="宿舍支出"
          data-index="dormitoryCost"
        ></a-table-column>
        <a-table-column
          title="宿舍应付"
          data-index="dormitoryDue"
        ></a-table-column>
        <a-table-column
          title="个人分摊"
          data-index="individualShare"
        ></a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { DormitoryIndividualExpenseState } from '@/store/modules/dormitory/types';
  import { formatDate } from '@/utils/date';
  import { getDormitoryIndividualExpense } from '@/api/dormitory';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<DormitoryIndividualExpenseState[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getDormitoryIndividualExpense();
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
    name: 'DormitoryIndividualExpense',
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
