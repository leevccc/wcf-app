<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="userId" label="请假人">
        <a-select v-model="form.userId">
          <a-option
            v-for="item of userList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="leaseStartDate" label="请假日期">
        <a-date-picker v-model="form.startDate" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="leaseEndDate" label="返工日期">
        <a-date-picker v-model="form.endDate" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="address" label="事由">
        <a-input v-model="form.reason" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    LeaveRecordForm,
    postLeaveRecord,
    putLeaveRecord,
  } from '@/api/leave';
  import { LeaveRecordState } from '@/store/modules/leave/types';
  import { UserOptions } from '@/store/modules/user/types';
  import { getUserList } from '@/api/user';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const title = ref<'添加请假记录' | '编辑请假记录'>('添加请假记录');
  const form = reactive<LeaveRecordForm>({});

  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      if (form.id !== undefined && form.id > 0) {
        await putLeaveRecord(form);
      } else {
        await postLeaveRecord(form);
      }
      emit('reload');
      Message.success({
        content: form.id !== undefined && form.id > 0 ? '更新成功' : '添加成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const userList = ref<UserOptions[]>([]);
  const fetchUserList = async () => {
    try {
      userList.value = [];
      const { data } = await getUserList();
      userList.value.push(
        ...data.map(({ id, name }) => ({
          id: id as number,
          name: name as string,
        }))
      );
    } catch (err) {
      window.console.log(err);
    }
  };

  const initial = (record: LeaveRecordState | undefined) => {
    if (record === undefined) {
      form.id = undefined;
      form.userId = undefined;
      form.startDate = undefined;
      form.endDate = undefined;
      form.reason = undefined;
    } else {
      form.id = record.id;
      form.userId = record.userId;
      form.startDate = record.startDate;
      form.endDate = record.endDate;
      form.reason = record.reason;
    }
    fetchUserList();
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'LeaveRecordForm',
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
