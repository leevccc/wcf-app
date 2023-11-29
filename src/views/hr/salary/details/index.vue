<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :ok-loading="loading"
    width="auto"
    ok-text="关闭"
    hide-cancel
    @ok="handleCancel"
  >
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="insertClick">添加</a-button>
          <a-button type="primary" @click="fetchData(currentUserId)">
            刷新
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-table :data="tableData" :pagination="false" :loading="loading">
      <template #columns>
        <a-table-column title="名称" align="center">
          <template #cell="{ record }">
            <a-auto-complete
              v-if="record.insertMode"
              v-model="record.name"
              :data="nameOptions"
            />
            <span v-else>{{ record.name }}</span>
          </template>
        </a-table-column>
        <a-table-column title="类型" align="center" :width="120">
          <template #cell="{ record }">
            <a-select v-if="record.insertMode" v-model="record.type">
              <a-option
                v-for="item of typeOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </a-select>
            <span v-else>
              {{ record.type === 'increase' ? '支付' : '扣除' }}
            </span>
          </template>
        </a-table-column>
        <a-table-column title="周期" align="center" :width="100">
          <template #cell="{ record }">
            <a-input-number v-if="record.insertMode" v-model="record.cycle" />
            <span v-else>{{ record.cycle }}</span>
          </template>
        </a-table-column>
        <a-table-column title="单位" align="center">
          <template #cell="{ record }">
            <a-select v-if="record.insertMode" v-model="record.cycleUnit">
              <a-option
                v-for="item of cycleUnitOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </a-select>
            <span v-else>
              {{
                record.cycleUnit === 'month'
                  ? '月'
                  : record.cycleUnit === 'year'
                  ? '年'
                  : '天'
              }}
            </span>
          </template>
        </a-table-column>
        <a-table-column title="金额" align="center">
          <template #cell="{ record }">
            <a-input-number v-if="record.insertMode" v-model="record.amount" />
            <span v-else>
              {{ record.amount }}
            </span>
          </template>
        </a-table-column>
        <a-table-column title="按天折算" align="center">
          <template #cell="{ record }">
            <a-switch
              v-if="record.insertMode"
              v-model="record.isDailyConversion"
              type="round"
              size="small"
            />
            <a-tag
              v-if="!record.insertMode && record.isDailyConversion"
              color="green"
            >
              是
            </a-tag>
            <a-tag
              v-if="!record.insertMode && !record.isDailyConversion"
              color="gray"
            >
              否
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column title="实时" align="center">
          <template #cell="{ record }">
            <a-switch
              v-if="record.insertMode"
              v-model="record.isRealTime"
              type="round"
              size="small"
            />
            <a-tag v-if="!record.insertMode && record.isRealTime" color="green">
              是
            </a-tag>
            <a-tag v-if="!record.insertMode && !record.isRealTime" color="gray">
              否
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column title="生效" align="center">
          <template #cell="{ record }">
            <a-tag
              v-if="!record.insertMode && record.isEffective"
              color="green"
            >
              是
            </a-tag>
            <a-tag
              v-if="!record.insertMode && !record.isEffective"
              color="gray"
            >
              否
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column title="生效时间" align="center" :width="140">
          <template #cell="{ record }">
            <a-month-picker
              v-if="record.insertMode"
              v-model="record.effectiveDate"
              format="YYYY-MM"
              @change="effectiveDateChanged(record)"
            />
            <span v-else>
              {{ record.effectiveDate }}
            </span>
          </template>
        </a-table-column>
        <a-table-column title="备注">
          <template #cell="{ record }">
            <a-input v-if="record.insertMode" v-model="record.notes" />
            <span v-else>
              {{ record.notes }}
            </span>
          </template>
        </a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button
              v-if="record.insertMode"
              size="mini"
              type="text"
              @click="saveClick(record)"
            >
              保存
            </a-button>
            <a-button
              v-if="record.insertMode"
              size="mini"
              type="text"
              @click="cancelEditClick(record)"
            >
              取消
            </a-button>
            <a-button
              v-if="!record.insertMode"
              size="mini"
              type="text"
              @click="record.insertMode = true"
            >
              编辑
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    SalaryConfigIndexState,
    SalaryConfigState,
  } from '@/store/modules/salary/types';
  import {
    getUserSalaryConfig,
    postUserSalaryConfig,
    putUserSalaryConfig,
  } from '@/api/salary';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const title = ref<string>('查看工资设置');
  const { loading, setLoading } = useLoading(false);
  const tableData = reactive<SalaryConfigState[]>([]);
  const currentUserId = ref<number>(0);
  const nameOptions = [
    '基本工资',
    '计件工资',
    '保底工资',
    '生活费',
    '房补',
    '社保',
  ];
  const typeOptions = [
    { value: 'increase', label: '支付' },
    { value: 'decrease', label: '扣除' },
  ];
  const cycleUnitOptions = [
    { value: 'day', label: '日' },
    { value: 'month', label: '月' },
    { value: 'year', label: '年' },
  ];
  const emit = defineEmits(['reload']);
  const handleCancel = () => {
    emit('reload');
    visible.value = false;
  };

  const effectiveDateChanged = (data: SalaryConfigState) => {
    data.effectiveDate += '-01';
  };

  const insertClick = () => {
    if (
      tableData.length > 0 &&
      tableData[tableData.length - 1].id === undefined
    ) {
      Message.error('请先保存新的数据');
      return;
    }
    tableData.push({
      insertMode: true,
      userId: currentUserId.value,
      type: 'increase',
      cycle: 1,
      cycleUnit: 'month',
      isDailyConversion: false,
      isRealTime: false,
    });
  };

  const fetchData = async (userId: number) => {
    setLoading(true);
    try {
      const { data } = await getUserSalaryConfig(userId);
      tableData.length = 0; // 重置tableData
      data.forEach((_data: SalaryConfigState) => {
        tableData.push(_data);
      });
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const initial = (data: SalaryConfigIndexState) => {
    title.value = `查看工资设置 / ${data.user}`;
    currentUserId.value = data.userId;
    fetchData(currentUserId.value);
    visible.value = true;
  };
  defineExpose({ initial });

  const saveClick = async (data: SalaryConfigState) => {
    setLoading(true);
    try {
      if (data.id === undefined) await postUserSalaryConfig(data);
      else await putUserSalaryConfig(data);
      await fetchData(currentUserId.value);
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const cancelEditClick = (data: SalaryConfigState) => {
    data.insertMode = false;
    if (data.id === undefined) tableData.pop();
  };
</script>

<script lang="ts">
  export default {
    name: 'SalaryDetails',
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
