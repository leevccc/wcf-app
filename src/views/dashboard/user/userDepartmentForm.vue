<template>
  <a-modal
    v-model:visible="visible"
    title="设置部门"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="user" label="用户">
        <a-input v-model="form.user" disabled />
      </a-form-item>
      <a-form-item field="departmentId" label="部门">
        <a-select v-model="form.departmentId">
          <a-option
            v-for="item of departmentList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { updateDepartment, UserDepartmentForm } from '@/api/user';
  import { UserState } from '@/store/modules/user/types';
  import { DepartmentState } from '@/store/modules/department/type';
  import { getDepartment } from '@/api/department';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const form = reactive<UserDepartmentForm>({});
  const handleCancel = () => {
    visible.value = false;
  };
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await updateDepartment(form);
      emit('reload');
      Message.success({
        content: '设置成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const departmentList = ref<DepartmentState[]>([]);
  const fetchDepartment = async () => {
    try {
      const { data } = await getDepartment();
      departmentList.value = data;
    } catch (error) {
      window.console.log(error);
    }
  };
  const initial = (record: UserState) => {
    form.userId = record.id;
    form.user = record.name;
    form.departmentId = record.departmentId;

    fetchDepartment();
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'UserDepartmentForm',
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
