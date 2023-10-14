<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="借款管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="newDataClick">添加</a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :data="tableData"
        :bordered="false"
        :pagination="false"
      >
        <template #columns>
          <a-table-column
            title="ID"
            data-index="id"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="借款人"
            data-index="user"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="金额"
            data-index="amount"
            :width="120"
          ></a-table-column>
          <a-table-column
            title="事由"
            data-index="purpose"
            :width="200"
          ></a-table-column>
          <a-table-column title="支付日期" :width="120">
            <template #cell="{ record }">
              {{ formatDate(record.paymentDate) }}
            </template>
          </a-table-column>
          <a-table-column
            title="支付方式"
            data-index="paymentMethod"
            :width="120"
          ></a-table-column>
          <a-table-column title="已入账" :width="80">
            <template #cell="{ record }">
              {{ record.isProcessed ? '是' : '否' }}
            </template>
          </a-table-column>
          <a-table-column title="备注" data-index="notes"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-popconfirm
                v-if="!record.isProcessed"
                :ok-loading="loading"
                content="手动更新借款记录为已入账?（生成工资时会查找未入账的借款，自动扣除相应工资并更新借款记录为已入账）"
                @ok="processedClick(record.id)"
              >
                <a-button type="text" size="mini">入账</a-button>
              </a-popconfirm>
              <a-popconfirm
                v-if="!record.isProcessed"
                :ok-loading="loading"
                content="确定要删除借款记录吗?"
                @ok="deleteClick(record.id)"
              >
                <a-button type="text" size="mini">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <loan-record-form ref="loanRecordFormRef" @reload="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { LoanRecordState } from '@/store/modules/loan/type';
  import {
    deleteLoadRecord,
    getLoanRecord,
    processedLoanRecord,
  } from '@/api/loan';
  import { formatDate } from '@/utils/date';
  import LoanRecordForm from '@/views/hr/loan/record/form.vue';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<LoanRecordState[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getLoanRecord();
      tableData.value = data;
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const loanRecordFormRef = ref<any>();
  const newDataClick = () => {
    loanRecordFormRef.value.initial();
  };
  const processedClick = async (id: number) => {
    setLoading(true);
    try {
      await processedLoanRecord(id);
      await fetchData();
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteClick = async (id: number) => {
    setLoading(true);
    try {
      await deleteLoadRecord(id);
      await fetchData();
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'LoanRecord',
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
