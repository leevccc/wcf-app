<template>
  <div class="container">
    <a-row style="margin-bottom: 16px">
      <a-col :flex="1">
        <a-form
          :model="form"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
          label-align="left"
        >
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="from" label="账单">
                <a-month-picker
                  v-model="form.billDate"
                  format="YYYY-MM"
                  @change="formBillDateChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="from" label="姓名">
                <a-input v-model="form.name" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-divider style="height: 84px" direction="vertical" />
      <a-col :flex="'86px'" style="text-align: right">
        <a-space direction="vertical" :size="18">
          <a-button type="primary" @click="fetchData()">
            <template #icon>
              <icon-search />
            </template>
            加载
          </a-button>
          <a-button @click="resetClick">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-divider style="margin-top: 0" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button
            type="primary"
            :disabled="!allowGenerate"
            @click="showGenerateFormClick"
          >
            生成
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-table
      row-key="id"
      :loading="loading"
      :data="tableData"
      :bordered="false"
      :pagination="false"
      :summary="summary"
    >
      <template #columns>
        <a-table-column title="账单" :width="100">
          <template #cell="{ record }">
            {{ getFormatYearAndMonth(record.billDate) }}
          </template>
        </a-table-column>
        <a-table-column title="员工ID" data-index="userId" />
        <a-table-column title="员工" data-index="user" />
        <a-table-column title="收款" data-index="paymentMethod" />
        <a-table-column title="账号" data-index="accountNumber" />
        <a-table-column title="天数" data-index="laborDays" />
        <a-table-column title="月薪" data-index="baseSalary" />
        <a-table-column title="计件" data-index="pieceSalary" />
        <a-table-column title="补贴" data-index="allowance" />
        <a-table-column title="扣除" data-index="deduction" />
        <a-table-column title="总工资" data-index="amount" />
        <a-table-column title="已支付" data-index="paid" />
        <a-table-column title="结清" data-index="finish" />
        <a-table-column title="备注" data-index="notes" />
        <a-table-column title="操作"> </a-table-column>
      </template>
    </a-table>
  </div>
  <salary-summary-generate-form
    ref="salarySummaryGenerateFormRef"
    @reload="fetchData"
  />
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { SalarySummaryState } from '@/store/modules/salary/types';
  import { reactive, ref } from 'vue';
  import { getSalarySummary } from '@/api/salary';
  import SalarySummaryGenerateForm from '@/views/hr/salary/summary/generateForm.vue';
  import { getFormatYearAndMonth } from '@/utils/date';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<SalarySummaryState[]>([]);
  const form = reactive<{ billDate?: string; name?: string }>({
    billDate: undefined,
    name: undefined,
  });
  const allowGenerate = ref(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getSalarySummary(form.billDate, form.name);
      tableData.value = data;
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
      allowGenerate.value = true;
    }
  };

  const resetClick = () => {
    form.billDate = undefined;
    form.name = undefined;
  };

  const formBillDateChange = () => {
    if (form.billDate !== undefined) form.billDate += '-01';
  };

  const salarySummaryGenerateFormRef = ref<any>();
  const showGenerateFormClick = () => {
    salarySummaryGenerateFormRef.value.initial(form.billDate);
  };

  const summary = ({ columns, data }: { columns: any; data: any }) => {
    const countData = {
      baseSalary: 0,
      pieceSalary: 0,
      allowance: 0,
      deduction: 0,
      amount: 0,
      paid: 0,
    };
    data.forEach(
      (record: {
        baseSalary: number;
        pieceSalary: number;
        allowance: number;
        deduction: number;
        amount: number;
        paid: number;
      }) => {
        countData.baseSalary += record.baseSalary;
        countData.pieceSalary += record.pieceSalary;
        countData.allowance += record.allowance;
        countData.deduction += record.deduction;
        countData.amount += record.amount;
        countData.paid += record.paid;
      }
    );
    return [
      {
        user: '总计',
        baseSalary: countData.baseSalary,
        pieceSalary: countData.pieceSalary,
        allowance: countData.allowance,
        deduction: countData.deduction,
        amount: countData.amount,
        paid: countData.paid,
      },
    ];
  };
</script>

<script lang="ts">
  export default {
    name: 'SalarySummary',
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
