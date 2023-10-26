<template>
  <a-modal
    v-model:visible="visible"
    title="生成工资单"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="billDate" label="账单日期">
        <a-month-picker
          v-model="form.billDate"
          format="YYYY-MM"
          @change="formBillDateChange"
        />
      </a-form-item>
      <a-form-item field="laborDays" label="上班天数">
        <a-input-number v-model="form.laborDays" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { reactive, ref } from 'vue';
  import { autoGenerate, SalaryGenerateForm } from '@/api/salary';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const form = reactive<SalaryGenerateForm>({});
  const handleCancel = () => {
    visible.value = false;
  };
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await autoGenerate(form);
      emit('reload');
      Message.success({
        content: '创建成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const initial = (billDate: string) => {
    form.billDate = billDate;
    form.laborDays = 30;
    visible.value = true;
  };
  defineExpose({ initial });

  const formBillDateChange = () => {
    if (form.billDate !== undefined) form.billDate += '-01';
  };
</script>

<script lang="ts">
  export default {
    name: 'SalarySummaryGenerateForm',
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
