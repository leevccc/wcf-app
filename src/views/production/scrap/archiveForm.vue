<template>
  <a-modal
    v-model:visible="visible"
    title="归档并统计数据"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="from" label="从">
        <a-date-picker v-model="form.from" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="end" label="到">
        <a-date-picker v-model="form.end" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="packageWeight" label="袋重(kg/个)">
        <a-input-number v-model="form.packageWeight" />
      </a-form-item>
      <a-form-item field="unitPrice" label="单价(元/kg)">
        <a-input-number v-model="form.unitPrice" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ArchiveForm, archiveScrap } from '@/api/scrap';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const form = reactive<ArchiveForm>({
    from: '',
    end: '',
    packageWeight: 0.15,
    unitPrice: 0,
  });
  const { loading, setLoading } = useLoading(true);
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await archiveScrap(form);
      emit('reload');
      Message.success({
        content: '归档成功, 请在统计结果里查看数据',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    visible.value = false;
  };

  const initForm = (from: string, end: string) => {
    setLoading(false);
    visible.value = true;
    form.from = from;
    form.end = end;
  };
  defineExpose({ initForm });
</script>

<script lang="ts">
  export default {
    name: 'ArchiveForm',
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
