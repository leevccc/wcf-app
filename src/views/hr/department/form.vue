<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="name" label="部门名称">
        <a-input v-model="form.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import {
    DepartmentForm,
    postDepartment,
    putDepartment,
  } from '@/api/department';
  import { DepartmentState } from '@/store/modules/department/type';

  const visible = ref(false);
  const title = ref<'创建部门' | '编辑部门'>('创建部门');
  const { loading, setLoading } = useLoading(false);
  const form = reactive<DepartmentForm>({});
  const handleCancel = () => {
    visible.value = false;
  };
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      if (form.id !== undefined && form.id > 0) {
        await putDepartment(form);
      } else {
        await postDepartment(form);
      }
      emit('reload');
      Message.success({
        content: form.id !== undefined && form.id > 0 ? '更新成功' : '创建成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const initial = (record: DepartmentState | undefined) => {
    if (record === undefined) {
      form.id = undefined;
      form.name = undefined;
      title.value = '创建部门';
    } else {
      form.id = record.id;
      form.name = record.name;
      title.value = '编辑部门';
    }
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'DepartmentForm',
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
