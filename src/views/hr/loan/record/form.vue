<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="userId" label="借款人">
        <a-select v-model="form.userId">
          <a-option
            v-for="item of userList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="amount" label="金额">
        <a-input-number v-model="form.amount" />
      </a-form-item>
      <a-form-item field="purpose" label="事由">
        <a-input v-model="form.purpose" />
      </a-form-item>
      <a-form-item field="paymentDate" label="支付日期">
        <a-date-picker v-model="form.paymentDate" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="paymentMethod" label="支付方式">
        <a-input v-model="form.paymentMethod" />
      </a-form-item>
      <a-form-item field="notes" label="备注">
        <a-input v-model="form.notes" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { LoanRecordForm, postLoanRecord, putLoanRecord } from '@/api/loan';
  import { UserOptions } from '@/store/modules/user/types';
  import { getUserList } from '@/api/user';
  import { LoanRecordState } from '@/store/modules/loan/type';
  import { formatDate } from '@/utils/date';

  const visible = ref(false);
  const title = ref<'添加借款记录' | '编辑借款记录'>('添加借款记录');
  const { loading, setLoading } = useLoading(false);
  const form = reactive<LoanRecordForm>({});
  const handleCancel = () => {
    visible.value = false;
  };
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      if (form.id !== undefined && form.id > 0) {
        await putLoanRecord(form);
      } else {
        await postLoanRecord(form);
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
  const initial = (record: LoanRecordState | undefined) => {
    if (record === undefined) {
      form.id = undefined;
      form.userId = undefined;
      form.amount = undefined;
      form.purpose = undefined;
      form.paymentDate = formatDate(new Date());
      form.paymentMethod = undefined;
      form.isProcessed = undefined;
      form.notes = undefined;
      title.value = '添加借款记录';
    } else {
      form.id = record.id;
      form.userId = record.userId;
      form.amount = record.amount;
      form.purpose = record.purpose;
      form.paymentDate = record.paymentDate;
      form.paymentMethod = record.paymentMethod;
      form.isProcessed = record.isProcessed;
      form.notes = record.notes;
      title.value = '编辑借款记录';
    }
    fetchUserList();
    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'LoanRecordForm',
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
