<template>
  <a-modal
    v-model:visible="visible"
    title="生成账单"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-row style="margin-bottom: 16px">
      <a-alert v-if="alertType === 'info'" type="info">
        如果账单已存在, 生成前会自动删除旧账单数据.
      </a-alert>
      <a-alert v-else-if="alertType === 'warning'" type="warning">
        账单已存在, 生成前会自动删除旧账单数据.
      </a-alert>
    </a-row>
    <a-form :model="form">
      <a-form-item field="date" label="账单日期">
        <a-month-picker
          v-model="form.date"
          format="YYYY-MM-DD"
          @change="billMonthChanged"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { reactive, ref } from 'vue';
  import {
    DormitoryExpenseGenerateForm,
    generateExpense,
  } from '@/api/dormitory';
  import { Message } from '@arco-design/web-vue';
  import { DormitoryExpenseState } from '@/store/modules/dormitory/types';
  import { formatDate } from '@/utils/date';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const form = reactive<DormitoryExpenseGenerateForm>({});
  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await generateExpense(form);
      emit('reload');
      Message.success({
        content: '账单已生成',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const existBillMonth = ref<string[]>([]);
  const alertType = ref<'info' | 'warning'>('info');

  const billMonthChanged = () => {
    form.date += '-01';
    alertType.value = 'info';
    existBillMonth.value.forEach((_data) => {
      if (_data === form.date) alertType.value = 'warning';
    });
  };

  const initial = (dormitoryExpense: DormitoryExpenseState[]) => {
    form.date = undefined;
    alertType.value = 'info';
    existBillMonth.value = [];
    dormitoryExpense.forEach((_de) => {
      existBillMonth.value.push(formatDate(_de.billMonth));
    });
    setLoading(false);
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'DormitoryExpenseForm',
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
