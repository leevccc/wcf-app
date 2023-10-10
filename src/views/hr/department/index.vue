<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="部门管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="newDataClick">新建</a-button>
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
            title="部门"
            data-index="name"
            :width="120"
          ></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button
                type="primary"
                size="mini"
                @click="editDataClick(record)"
                >编辑</a-button
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <department-form ref="departmentFormRef" @reload="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { DepartmentState } from '@/store/modules/department/type';
  import { getDepartment } from '@/api/department';
  import DepartmentForm from '@/views/hr/department/form.vue';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<DepartmentState[]>([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getDepartment();
      tableData.value = data;
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const departmentFormRef = ref<any>();
  const newDataClick = () => {
    departmentFormRef.value.initial();
  };
  const editDataClick = (record: DepartmentState) => {
    departmentFormRef.value.initial(record);
  };
</script>

<script lang="ts">
  export default {
    name: 'Department',
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
