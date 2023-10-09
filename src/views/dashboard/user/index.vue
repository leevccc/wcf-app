<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="用户管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="newUserClick">创建</a-button>
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
          <a-table-column title="Id" data-index="id"></a-table-column>
          <a-table-column title="用户名" data-index="username"></a-table-column>
          <a-table-column title="邮箱" data-index="email"></a-table-column>
          <a-table-column title="姓名" data-index="name"></a-table-column>
          <a-table-column title="性别">
            <template #cell="{ record }">
              <a-tag v-if="record.gender === 'Male'" color="arcoblue">男</a-tag>
              <a-tag v-else-if="record.gender === 'Female'" color="magenta">
                女
              </a-tag>
              <a-tag v-else color="gray">保密</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="身份证" data-index="idNumber"></a-table-column>
          <a-table-column title="地址" data-index="address"></a-table-column>
          <a-table-column title="部门" data-index="department"></a-table-column>
          <a-table-column title="入职">
            <template #cell="{ record }">
              {{ formatDate(record.hireDate) }}
            </template>
          </a-table-column>
          <a-table-column title="离职">
            <template #cell="{ record }">
              {{ formatDate(record.resignationDate) }}
            </template>
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button type="text" size="mini" @click="editUserClick(record)">
                编辑
              </a-button>
              <a-button
                type="text"
                size="mini"
                @click="setDepartmentClick(record)"
              >
                部门
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <user-form ref="userFormRef" @reload="fetchData" />
    <user-department-form ref="userDepartmentFormRef" @reload="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { UserState } from '@/store/modules/user/types';
  import { ref } from 'vue';
  import { getUserList } from '@/api/user';
  import { formatDate } from '@/utils/date';
  import UserForm from '@/views/dashboard/user/form.vue';
  import UserDepartmentForm from '@/views/dashboard/user/userDepartmentForm.vue';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<UserState[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getUserList();
      tableData.value = data;
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const userFormRef = ref<any>();
  const newUserClick = () => {
    userFormRef.value.initial();
  };
  const editUserClick = (user: UserState) => {
    userFormRef.value.initial(user);
  };

  const userDepartmentFormRef = ref<any>();
  const setDepartmentClick = (record: UserState) => {
    userDepartmentFormRef.value.initial(record);
  };
</script>

<script lang="ts">
  export default {
    name: 'User',
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
