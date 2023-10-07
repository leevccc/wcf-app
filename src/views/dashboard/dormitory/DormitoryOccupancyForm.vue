<template>
  <a-modal
    v-model:visible="visible"
    title="登记住宿信息"
    :ok-loading="loading"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="form">
      <a-form-item field="userId" label="用户">
        <a-select v-model="form.userId">
          <a-option
            v-for="item of userList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="dormitoryId" label="宿舍">
        <a-select v-model="form.dormitoryId">
          <a-option
            v-for="item of dormitoryList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="date" label="搬入日期">
        <a-date-picker v-model="form.checkInDate" format="YYYY-MM-DD" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    DormitoryOccupancyForm,
    getDormitory,
    postDormitoryRecord,
  } from '@/api/dormitory';
  import { Message } from '@arco-design/web-vue';
  import {
    DormitoryOccupancyState,
    DormitoryOptions,
  } from '@/store/modules/dormitory/types';
  import { UserOptions } from '@/store/modules/user/types';
  import { getUserList } from '@/api/user';

  const visible = ref(false);
  const { loading, setLoading } = useLoading(true);
  const form = reactive<DormitoryOccupancyForm>({
    userId: undefined,
    dormitoryId: undefined,
    checkInDate: undefined,
  });

  const dormitoryList = ref<DormitoryOptions[]>([]);
  const fetchDormitoryList = async () => {
    try {
      const { data } = await getDormitory();
      data.forEach((_data) => {
        if (!_data.id || !_data.roomNumber) return;
        dormitoryList.value.push({ id: _data.id, name: _data.roomNumber });
      });
    } catch (err) {
      window.console.log(err);
    }
  };

  const dormitoryOccupancyList = ref<DormitoryOccupancyState[]>([]);

  const userList = ref<UserOptions[]>([]);
  const fetchUserList = async () => {
    try {
      const { data } = await getUserList();
      const existingUserIdsWithCheckOut = dormitoryOccupancyList.value
        .filter((_do) => _do.checkOutDate)
        .map((_do) => _do.userId);

      const newUsers = data.filter(
        (_user) => !existingUserIdsWithCheckOut.includes(_user.id)
      );

      userList.value.push(
        ...newUsers.map(({ id, name }) => ({
          id: id as number,
          name: name as string,
        }))
      );
    } catch (err) {
      window.console.log(err);
    }
  };

  const handleCancel = () => {
    visible.value = false;
  };

  const emit = defineEmits(['reload']);
  const handleBeforeOk = async () => {
    setLoading(true);
    try {
      await postDormitoryRecord(form);
      emit('reload');
      Message.success({
        content: '信息已登记',
        resetOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const initial = () => {
    fetchDormitoryList();
    fetchUserList();
    visible.value = true;
    setLoading(false);
  };
  defineExpose({ initial, dormitoryOccupancyList });
</script>

<script lang="ts">
  export default {
    name: 'DormitoryOccupancyForm',
  };
</script>

<style lang="less" scoped></style>
