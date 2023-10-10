<template>
  <a-modal
    v-model:visible="visible"
    title="创建计件价格"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
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
      <a-form-item field="action" label="动作">
        <a-input v-model="form.action" />
      </a-form-item>
      <a-form-item field="price" label="价格">
        <a-input-number v-model="form.price" />
      </a-form-item>
      <a-form-item field="comments" label="备注">
        <a-input v-model="form.comments" />
      </a-form-item>
      <a-form-item field="effectiveDate" label="生效日期">
        <a-date-picker v-model="form.effectiveDate" format="YYYY-MM-DD" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { LaborCostForm, postLaborCost } from '@/api/labor';
  import { DepartmentState } from '@/store/modules/department/type';
  import { getDepartment } from '@/api/department';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const form = reactive<LaborCostForm>({});
  const handleCancel = () => {
    visible.value = false;
  };
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await postLaborCost(form);
      emit('reload');
      Message.success({
        content: '创建成功',
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
  const initial = () => {
    form.departmentId = undefined;
    form.action = undefined;
    form.price = undefined;
    form.comments = undefined;
    form.effectiveDate = undefined;
    visible.value = true;
  };
  fetchDepartment();
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'LaborCostForm',
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
