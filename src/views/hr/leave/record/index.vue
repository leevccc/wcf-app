<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="请假记录">
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
            title="Id"
            data-index="id"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="请假人"
            data-index="user"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column title="请假日期" align="center" :width="120">
            <template #cell="{ record }">
              {{ formatDate(record.startDate) }}
            </template>
          </a-table-column>
          <a-table-column title="返工日期" align="center" :width="120">
            <template #cell="{ record }">
              {{ formatDate(record.endDate) }}
            </template>
          </a-table-column>
          <a-table-column title="事由" data-index="reason"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button
                type="primary"
                size="mini"
                @click="editDataClick(record)"
              >
                编辑
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <leave-record-form ref="leaveRecordFormRef" @reload="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { formatDate } from '@/utils/date';
  import useLoading from '@/hooks/loading';
  import { LeaveRecordState } from '@/store/modules/leave/types';
  import { ref } from 'vue';
  import { getLeaveRecord } from '@/api/leave';
  import LeaveRecordForm from '@/views/hr/leave/record/form.vue';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<LeaveRecordState[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getLeaveRecord();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const leaveRecordFormRef = ref<any>();
  const newDataClick = () => {
    leaveRecordFormRef.value.initial();
  };
  const editDataClick = (record: LeaveRecordState) => {
    leaveRecordFormRef.value.initial(record);
  };
</script>

<script lang="ts">
  export default {
    name: 'LeaveRecord',
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
