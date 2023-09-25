<template>
  <a-modal
    v-model:visible="visible"
    title="统计结果"
    width="auto"
    @cancel="handleCancel"
  >
    <a-table
      row-key="id"
      :loading="loading"
      :data="tableData"
      :bordered="false"
      :pagination="false"
    >
      <template #columns>
        <a-table-column title="Id" data-index="id"></a-table-column>
        <a-table-column
          title="起始日期"
          data-index="startDate"
          align="center"
          :width="120"
        >
          <template #cell="{ record }">
            {{ formatDate(record.startDate) }}
          </template>
        </a-table-column>
        <a-table-column
          title="结束日期"
          data-index="endDate"
          align="center"
          :width="120"
        >
          <template #cell="{ record }">
            {{ formatDate(record.endDate) }}
          </template>
        </a-table-column>
        <a-table-column
          title="总重(kg)"
          data-index="totalWeightKg"
          align="center"
          :width="120"
        >
          <template #cell="{ record }">
            {{ record.totalWeightKg.toFixed(2) }}
          </template>
        </a-table-column>
        <a-table-column
          title="总袋数"
          data-index="totalPackage"
          align="center"
          :width="100"
        ></a-table-column>
        <a-table-column
          title="袋子重量"
          data-index="packageWeight"
          align="center"
          :width="120"
        ></a-table-column>
        <a-table-column
          title="袋子总重"
          data-index="totalPackageWeight"
          align="center"
          :width="120"
        >
          <template #cell="{ record }">
            {{ record.totalPackageWeight.toFixed(2) }}
          </template>
        </a-table-column>
        <a-table-column
          title="净重(kg)"
          data-index="netWeightKg"
          align="center"
          :width="120"
        >
          <template #cell="{ record }">
            {{ record.netWeightKg.toFixed(2) }}
          </template>
        </a-table-column>
        <a-table-column
          title="单价(元/kg)"
          data-index="unitPrice"
          align="center"
          :width="120"
        ></a-table-column>
        <a-table-column
          title="总价(元)"
          data-index="totalPrice"
          align="center"
          :width="120"
        >
          <template #cell="{ record }">
            {{ record.totalPrice.toFixed(0) }}
          </template>
        </a-table-column>
        <a-table-column title="备注" data-index="comments"></a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { ScrapStatisticState } from '@/store/modules/scrap/types';
  import { getScrapStatistics } from '@/api/scrap';
  import { formatDate } from '@/utils/date';

  const { loading, setLoading } = useLoading(true);
  const visible = ref(false);
  const handleCancel = () => {
    visible.value = false;
  };

  const tableData = ref<ScrapStatisticState[]>([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getScrapStatistics();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const initial = () => {
    visible.value = true;
    fetchData();
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'ScrapStatistics',
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
