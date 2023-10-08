<template>
  <a-modal
    v-model:visible="visible"
    title="添加宿舍水电记录"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="dormitoryId" label="宿舍">
        <a-select v-model="form.dormitoryId">
          <a-option
            v-for="item of dormitoryList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="date" label="采集日期">
        <a-date-picker v-model="form.date" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="water" label="读数: 水">
        <a-input-number v-model="form.water" />
      </a-form-item>
      <a-form-item field="electricity" label="读数: 电">
        <a-input-number v-model="form.electricity" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import {
    DormitoryRecordForm,
    getDormitory,
    postDormitoryRecord,
  } from '@/api/dormitory';
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { DormitoryOptions } from '@/store/modules/dormitory/types';

  const visible = ref(false);
  const form = reactive<DormitoryRecordForm>({
    dormitoryId: undefined,
    date: undefined,
    water: undefined,
    electricity: undefined,
  });
  const { loading, setLoading } = useLoading(true);
  setLoading(false);

  const dormitoryList = ref<DormitoryOptions[]>([]);
  const fetchDormitoryList = async () => {
    try {
      dormitoryList.value = [];
      const { data } = await getDormitory();
      data.forEach((_data) => {
        if (!_data.id || !_data.roomNumber) return;
        dormitoryList.value.push({ id: _data.id, name: _data.roomNumber });
      });
    } catch (err) {
      window.console.log(err);
    }
  };

  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await postDormitoryRecord(form);
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
    fetchDormitoryList();
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'DormitoryRecordForm',
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
