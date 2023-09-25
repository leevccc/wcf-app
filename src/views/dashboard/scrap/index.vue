<template>
  <div class="container">
    <Breadcrumb :items="['废料记录']" />
    <a-card class="general-card" title="废料记录">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-upload action="/">
              <template #upload-button>
                <a-button type="primary"> 数据上传 </a-button>
              </template>
            </a-upload>
            <a-button> 归档并统计 </a-button>
            <a-button> 统计结果 </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :pagination="false"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { reactive } from 'vue';

  const { loading, setLoading } = useLoading(true);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const tableData = reactive([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ]);
  setLoading(false);
</script>

<script lang="ts">
  export default {
    name: 'Scrap',
  };
</script>

<style lang="less" scoped></style>
