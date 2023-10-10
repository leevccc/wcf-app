<template>
  <a-modal
    v-model:visible="visible"
    title="登记住宿信息"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="user" label="用户">
        <a-input v-model="form.user" disabled />
      </a-form-item>
      <a-form-item field="dormitory" label="宿舍">
        <a-input v-model="form.dormitory" disabled />
      </a-form-item>
      <a-form-item field="date" label="搬入日期">
        <a-date-picker
          v-model="form.checkInDate"
          format="YYYY-MM-DD"
          disabled
        />
      </a-form-item>
      <a-form-item field="date" label="搬出日期">
        <a-date-picker v-model="form.checkOutDate" format="YYYY-MM-DD" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    DormitoryOccupancyForm,
    putDormitoryOccupancy,
  } from '@/api/dormitory';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { DormitoryOccupancyState } from '@/store/modules/dormitory/types';

  const visible = ref(false);
  const form = reactive<DormitoryOccupancyForm>({});
  const { loading, setLoading } = useLoading(false);

  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await putDormitoryOccupancy(form);
      emit('reload');
      Message.success({
        content: '信息已登记',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const initial = (dormitoryOccupancy: DormitoryOccupancyState) => {
    form.id = dormitoryOccupancy.id;
    form.user = dormitoryOccupancy.user;
    form.dormitory = dormitoryOccupancy.dormitory;
    form.checkInDate = dormitoryOccupancy.checkInDate;
    form.checkOutDate = undefined;
    setLoading(false);
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'DOccupancyCheckOutForm',
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
