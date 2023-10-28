<template>
  <a-modal
    v-model:visible="visible"
    title="编辑计件数据"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item label="卡片">
        <a-input v-model="form.cardGroup" />
      </a-form-item>
      <a-form-item label="编号">
        <a-input v-model="form.cardNumber" />
      </a-form-item>
      <a-form-item field="productName" label="产品">
        <a-input v-model="form.productName" />
      </a-form-item>
      <a-form-item field="date" label="日期">
        <a-date-picker v-model="form.date" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="selectLaborCostClick">
          选择工种
        </a-button>
      </a-form-item>
      <a-form-item label="部门">
        <a-input v-model="form.department" disabled />
      </a-form-item>
      <a-form-item label="动作">
        <a-input v-model="form.action" disabled />
      </a-form-item>
      <a-form-item field="quantity" label="数量">
        <a-input-number v-model="form.quantity" @change="calculateAmount" />
      </a-form-item>
      <a-form-item field="frequency" label="步骤">
        <a-input-number v-model="form.frequency" @change="calculateAmount" />
      </a-form-item>
      <a-form-item label="单价">
        <a-input-number v-model="form.unitPrice" disabled />
      </a-form-item>
      <a-form-item label="金额">
        <a-input-number v-model="form.amount" disabled />
      </a-form-item>
      <a-form-item> 金额仅供参考, 以保存后的数据为准 </a-form-item>
      <a-form-item field="userId" label="生产者">
        <a-select v-model="form.userId" allow-search>
          <a-option
            v-for="item of userOptions"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="notes" label="备注">
        <a-input v-model="form.notes" />
      </a-form-item>
    </a-form>
  </a-modal>
  <labor-data-select-cost-form
    ref="laborDataSelectCostFormRef"
    @selected="useLaborCost"
  />
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { reactive, ref } from 'vue';
  import { LaborDataForm, putLaborData } from '@/api/labor';
  import { Message } from '@arco-design/web-vue';
  import { LaborDataState } from '@/store/modules/labor/data/type';
  import { UserOptions } from '@/store/modules/user/types';
  import { getUserList } from '@/api/user';
  import LaborDataSelectCostForm from '@/views/production/labor/data/selectCostForm.vue';
  import { LaborCostState } from '@/store/modules/labor/cost/type';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(false);
  const form = reactive<LaborDataForm>({});
  const handleCancel = () => {
    visible.value = false;
  };
  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      const { data } = await putLaborData(form);
      emit('reload', data);
      Message.success({
        content: '更新成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const initial = (data: LaborDataState) => {
    fetchUserList();

    form.id = data.id;
    form.orderId = data.orderId;
    form.productId = data.productId;
    form.productName = data.productName;
    form.date = data.date;
    form.laborCostId = data.laborCostId;
    form.departmentId = data.departmentId;
    form.department = data.department;
    form.action = data.action;
    form.quantity = data.quantity;
    form.frequency = data.frequency;
    form.unitPrice = data.unitPrice;
    form.amount = data.amount;
    form.notes = data.notes;
    form.userId = data.userId;
    form.producer = data.producer;
    form.cardGroup = data.cardGroup;
    form.cardNumber = data.cardNumber;
    form.archiveDate = data.archiveDate;
    visible.value = true;
  };
  defineExpose({ initial });

  const userOptions = ref<UserOptions[]>([]);
  const fetchUserList = async () => {
    try {
      userOptions.value = [];
      const { data } = await getUserList();
      data.forEach((_data) => {
        userOptions.value.push({
          id: _data.id as number,
          name: _data.name as string,
        });
      });
    } catch (err) {
      window.console.log(err);
    }
  };

  const useLaborCost = (data: LaborCostState) => {
    form.laborCostId = data.id;
    form.departmentId = data.departmentId;
    form.department = data.department;
    form.action = data.action;
    form.unitPrice = data.price;
    calculateAmount();
  };

  const calculateAmount = () => {
    form.amount =
      (form.quantity as number) *
      (form.unitPrice as number) *
      (form.frequency as number);
    form.amount = Math.round(form.amount * 100) / 100;
  };

  const laborDataSelectCostFormRef = ref<any>();
  const selectLaborCostClick = () => {
    laborDataSelectCostFormRef.value.initial();
  };
</script>

<script lang="ts">
  export default {
    name: 'LaborDataForm',
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
