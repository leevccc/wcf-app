<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="计件数据">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
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
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="订单ID"
            data-index="orderId"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="产品"
            data-index="product"
            align="center"
            :width="120"
          ></a-table-column>
          <a-table-column title="日期" :width="120" align="center">
            <template #cell="{ record }">
              {{ formatDate(record.date) }}
            </template>
          </a-table-column>
          <a-table-column
            title="部门"
            data-index="department"
            align="center"
            :width="80"
          ></a-table-column>
          <a-table-column
            title="动作"
            data-index="action"
            align="center"
            :width="140"
          ></a-table-column>
          <a-table-column
            title="数量"
            data-index="quantity"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="步骤"
            data-index="frequency"
            align="center"
            :width="60"
          ></a-table-column>
          <a-table-column
            title="单价"
            data-index="unitPrice"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="金额"
            data-index="amount"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="生产者"
            data-index="producer"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="卡片"
            data-index="cardGroup"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="编号"
            data-index="cardNumber"
            align="center"
            :width="60"
          ></a-table-column>
          <a-table-column title="备注" data-index="notes"></a-table-column>
          <a-table-column title="操作"> </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { LaborCostState } from '@/store/modules/labor/cost/type';
  import { getLaborData } from '@/api/labor';
  import { formatDate } from '@/utils/date';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';

  const { loading, setLoading } = useLoading(false);
  const tableData = ref<LaborCostState[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getLaborData();
      tableData.value = data;
    } catch (error) {
      window.console.log(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

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
        fetchData();
      }

      onSuccess(xhr.response);
    };

    const formData = new FormData();
    formData.append(name || 'file', fileItem.file);
    xhr.open(
      'post',
      `${import.meta.env.VITE_API_BASE_URL}/api/labor/data`,
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
    name: 'LaborData',
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
