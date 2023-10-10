<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="计件价格">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" status="success" @click="newDataClick">
              添加
            </a-button>
            <a-upload
              accept=".xlsx"
              :custom-request="customRequest"
              :show-upload-list="false"
              :show-file-list="false"
            >
              <template #upload-button>
                <a-button type="primary" status="success">导入</a-button>
              </template>
            </a-upload>
            <a-button
              type="primary"
              :disabled="curQuery === 'all'"
              @click="fetchData('all')"
            >
              查询全部
            </a-button>
            <a-button
              type="primary"
              :disabled="curQuery === 'old'"
              @click="fetchData('old')"
            >
              包含过期
            </a-button>
            <a-button
              type="primary"
              :disabled="curQuery === 'now'"
              @click="fetchData('now')"
            >
              生效中
            </a-button>
            <a-button
              type="primary"
              :disabled="curQuery === 'future'"
              @click="fetchData('future')"
            >
              即将生效
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
      >
        <template #columns>
          <a-table-column
            title="Id"
            data-index="id"
            :width="100"
            align="center"
          ></a-table-column>
          <a-table-column
            title="部门"
            data-index="department"
            :width="120"
            align="center"
            :filterable="filterable"
          ></a-table-column>
          <a-table-column
            title="动作"
            align="center"
            data-index="action"
            :width="140"
          ></a-table-column>
          <a-table-column
            title="价格"
            align="center"
            data-index="price"
            :width="120"
          ></a-table-column>
          <a-table-column
            title="生效日期"
            data-index="effectiveDate"
            :width="120"
          >
            <template #cell="{ record }">
              {{ formatDate(record.effectiveDate) }}
            </template>
          </a-table-column>
          <a-table-column title="备注" data-index="comments"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-popconfirm
                :ok-loading="loading"
                content="操作不可逆, 确定要删除这条数据吗?"
                @ok="deleteClick(record)"
              >
                <a-button
                  v-if="curQuery === 'future'"
                  type="primary"
                  status="danger"
                  size="mini"
                >
                  删除
                </a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <labor-cost-form ref="laborCostFormRef" @reload="fetchData(curQuery)" />
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { LaborCostState } from '@/store/modules/labor/cost/type';
  import {
    deleteLaborCost,
    getEffectiveLaborCost,
    getFutureLaborCost,
    getLaborCost,
    getOldLaborCost,
  } from '@/api/labor';
  import { formatDate } from '@/utils/date';
  import LaborCostForm from '@/views/production/labor/cost/form.vue';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<LaborCostState[]>([]);
  const filterable = {
    filters: [{ text: '', value: '' }],
    filter: (value: any, record: any) => record.department.includes(value),
  };

  const curQuery = ref<'all' | 'old' | 'now' | 'future'>('now');

  const fetchData = async (cq: 'all' | 'old' | 'now' | 'future') => {
    setLoading(true);
    try {
      let data;
      switch (cq) {
        case 'all':
          data = await getLaborCost();
          break;
        case 'old':
          data = await getOldLaborCost();
          break;
        case 'now':
          data = await getEffectiveLaborCost();
          break;
        case 'future':
          data = await getFutureLaborCost();
          break;
        default:
          data = undefined;
      }
      if (data !== undefined) {
        tableData.value = data.data;
        setFilterable();
      }
    } catch (error) {
      window.console.log(error);
    } finally {
      curQuery.value = cq;
      setLoading(false);
    }
  };
  fetchData('now');

  const setFilterable = () => {
    filterable.filters = tableData.value.map((_do) => ({
      text: _do.department as string,
      value: _do.department as string,
    }));
    // 去重
    const obj: { [key: string]: boolean } = {};
    filterable.filters = filterable.filters.reduce<
      {
        text: string;
        value: string;
      }[]
    >((item, next) => {
      if (!obj[next.value]) {
        item.push(next);
        obj[next.value] = true;
      }
      return item;
    }, []);
  };

  const laborCostFormRef = ref<any>();
  const newDataClick = () => {
    laborCostFormRef.value.initial();
  };

  const deleteClick = async (record: LaborCostState) => {
    setLoading(true);
    try {
      await deleteLaborCost(record.id as number);
      await fetchData(curQuery.value);
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const customRequest = (option: {
    onProgress: any;
    onError: any;
    onSuccess: any;
    fileItem: any;
    name?: any;
  }) => {
    const { onProgress, onError, onSuccess, fileItem, name } = option;

    const isXLSX =
      fileItem.file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isXLSX) {
      Message.error('只能上传 xlsx 文件');
      onError('只能上传 xlsx 文件');
      return {
        abort() {
          xhr.abort();
        },
      };
    }

    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        let percent;
        if (event.total > 0) {
          // 0 ~ 1
          percent = event.loaded / event.total;
        }
        onProgress(percent, event);
      };
    }

    xhr.onerror = function error(e) {
      onError(e);
    };

    // eslint-disable-next-line consistent-return
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return onError(xhr.responseText);
      }
      const res = JSON.parse(xhr.response);
      if (res.code !== '200') {
        Message.error(res.message);
      } else {
        Message.success('上传成功。');
        fetchData(curQuery.value);
      }

      onSuccess(xhr.response);
    };

    const formData = new FormData();
    formData.append(name || 'file', fileItem.file);
    xhr.open(
      'post',
      `${import.meta.env.VITE_API_BASE_URL}/api/labor/cost/excel`,
      true
    );
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    xhr.send(formData);

    return {
      abort() {
        xhr.abort();
      },
    };
  };
</script>

<script lang="ts">
  export default {
    name: 'LaborCost',
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
