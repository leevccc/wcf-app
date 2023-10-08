<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="username" label="用户名">
        <a-input
          v-model="form.username"
          :disabled="form.id > 0"
          placeholder="!!!创建后无法修改"
        />
      </a-form-item>
      <a-form-item field="password" label="密码">
        <a-input-password
          v-if="form.id > 0"
          v-model="form.password"
          placeholder="如果不修改请留空"
          allow-clear
        />
        <a-input-password
          v-else
          v-model="form.password"
          placeholder="请输入密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="email" label="邮箱">
        <a-input v-model="form.email" />
      </a-form-item>
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="gender" label="性别">
        <a-select v-model="form.gender" placeholder="请选择...">
          <a-option value="Male">男</a-option>
          <a-option value="Female">女</a-option>
          <a-option value="Other">保密</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="idNumber" label="身份证">
        <a-input v-model="form.idNumber" />
      </a-form-item>
      <a-form-item field="address" label="地址">
        <a-input v-model="form.address" />
      </a-form-item>
      <a-form-item field="hireDate" label="入职时间">
        <a-date-picker v-model="form.hireDate" format="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item field="resignationDate" label="离职时间">
        <a-date-picker
          v-model="form.resignationDate"
          format="YYYY-MM-DD"
          :disabled="form.id === undefined"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { postUser, putUser, UserForm } from '@/api/user';
  import { UserState } from '@/store/modules/user/types';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const title = ref<'新建用户' | '编辑用户'>('新建用户');
  const { loading, setLoading } = useLoading(false);
  const form = reactive<UserForm>({});

  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      if (form.id !== undefined && form.id > 0) {
        await putUser(form);
      } else {
        await postUser(form);
      }
      emit('reload');
      Message.success({
        content: '添加成功',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const initial = (user: UserState | undefined) => {
    if (user === undefined) {
      form.id = undefined;
      form.username = undefined;
      form.email = undefined;
      form.name = undefined;
      form.gender = undefined;
      form.idNumber = undefined;
      form.address = undefined;
      form.hireDate = undefined;
      form.resignationDate = undefined;
      title.value = '新建用户';
    } else {
      form.id = user.id;
      form.username = user.username;
      form.email = user.email;
      form.name = user.name;
      form.gender = user.gender;
      form.idNumber = user.idNumber;
      form.address = user.address;
      form.hireDate = user.hireDate;
      form.resignationDate = user.resignationDate;
      title.value = '编辑用户';
    }

    form.password = undefined;

    visible.value = true;
  };
  defineExpose({ initial });
</script>

<script lang="ts">
  export default {
    name: 'UserForm',
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
