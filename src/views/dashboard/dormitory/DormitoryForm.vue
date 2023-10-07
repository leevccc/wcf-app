<template>
  <a-modal
    v-model:visible="visible"
    title="添加宿舍"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="roomNumber" label="宿舍">
        <a-input v-model="form.roomNumber" />
      </a-form-item>
      <a-form-item field="address" label="地址">
        <a-input v-model="form.address" />
      </a-form-item>
      <a-form-item field="waterPrice" label="水单价">
        <a-input-number v-model="form.waterPrice" />
      </a-form-item>
      <a-form-item field="electricityPrice" label="电单价">
        <a-input-number v-model="form.electricityPrice" />
      </a-form-item>
      <a-form-item field="leaseStartDate" label="租赁日期">
        <a-date-picker v-model="form.leaseStartDate" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="leaseEndDate" label="终止日期">
        <a-date-picker v-model="form.leaseEndDate" format="YYYY-MM-DD" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { DormitoryForm, postDormitory } from '@/api/dormitory';
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const form = reactive<DormitoryForm>({
    roomNumber: undefined,
    address: undefined,
    waterPrice: undefined,
    electricityPrice: undefined,
    leaseStartDate: undefined,
    leaseEndDate: undefined,
  });
  const { loading, setLoading } = useLoading(true);
  setLoading(false);

  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await postDormitory(form);
      emit('reload');
      Message.success({
        content: '添加成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const initial = () => {
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'DormitoryForm',
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
