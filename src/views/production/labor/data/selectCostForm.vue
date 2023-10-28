<template>
  <a-modal
    v-model:visible="visible"
    title="选择工种"
    :ok-loading="loading"
    width="auto"
    ok-text="关闭"
    hide-cancel
    @ok="handleCancel"
  >
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
          align="center"
        ></a-table-column>
        <a-table-column
          title="生效日期"
          data-index="effectiveDate"
          :width="120"
        >
          <template #cell="{ record }">
            {{ formatDate(record.effectiveDate) }}
          </template>
        </a-table-column>
        <a-table-column
          title="部门"
          data-index="department"
          :width="120"
          align="center"
        ></a-table-column>
        <a-table-column
          title="动作"
          align="center"
          data-index="action"
          :width="140"
        ></a-table-column>
        <a-table-column
          title="价格"
          align="center"
          data-index="price"
          :width="120"
        ></a-table-column>
        <a-table-column title="备注" data-index="comments"></a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button size="mini" type="text" @click="useLaborCost(record)">
              选择
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { LaborCostState } from '@/store/modules/labor/cost/type';
  import { getEffectiveLaborCost } from '@/api/labor';
  import { formatDate } from '@/utils/date';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const handleCancel = () => {
    visible.value = false;
  };

  const tableData = ref<LaborCostState[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getEffectiveLaborCost();
      tableData.value = data;
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const emit = defineEmits(['selected']);
  const useLaborCost = (data: LaborCostState) => {
    emit('selected', data);
    visible.value = false;
  };

  const initial = () => {
    fetchData();
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'LaborDataSelectCostForm',
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
