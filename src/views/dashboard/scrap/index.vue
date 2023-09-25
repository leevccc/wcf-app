<template>
  <div class="container">
    <Breadcrumb />
    <a-card class="general-card" title="废料数据">
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
                <a-button type="primary"> 数据上传 </a-button>
              </template>
            </a-upload>
            <a-button @click="archiveClick"> 归档并统计 </a-button>
            <a-button @click="scrapStatisticsClick"> 统计结果 </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :data="tableData"
        :bordered="false"
        :pagination="false"
        :summary="summary"
        :default-expanded-keys="expandedKeys"
        :scroll="{ y: 'calc(100vh - 310px)' }"
      >
        <template #columns>
          <a-table-column title="展开" :width="60"></a-table-column>
          <a-table-column
            title="Id"
            data-index="id"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="日期"
            data-index="dateRecorded"
            align="center"
            :width="120"
          >
            <template #cell="{ record }">
              {{ formatDate(record.dateRecorded) }}
            </template>
          </a-table-column>
          <a-table-column
            title="编号"
            data-index="packageNumber"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column
            title="重量(kg)"
            data-index="weightKg"
            align="center"
            :width="120"
          ></a-table-column>
          <a-table-column
            title="袋数"
            data-index="totalPackage"
            align="center"
            :width="100"
          ></a-table-column>
          <a-table-column title="备注" data-index="comments"></a-table-column>
        </template>
      </a-table>
    </a-card>
    <ArchiveForm ref="archiveFormRef" @reloadData="fetchData"></ArchiveForm>
    <ScrapStatistics ref="scrapStatisticsRef"></ScrapStatistics>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { ref } from 'vue';
  import { getScrap, ScrapForm } from '@/api/scrap';
  import { ScrapState } from '@/store/modules/scrap/types';
  import { formatDate } from '@/utils/date';
  import { getToken } from '@/utils/auth';
  import { Message } from '@arco-design/web-vue';
  import ArchiveForm from '@/views/dashboard/scrap/archiveForm.vue';
  import ScrapStatistics from '@/views/dashboard/scrap/scrapStatistics.vue';

  const { loading, setLoading } = useLoading(true);
  const tableData = ref<ScrapState[]>([]);
  const expandedKeys = ref<number[]>([]);
  const fetchData = async (params: ScrapForm = { archive: false }) => {
    setLoading(true);
    try {
      const { data } = await getScrap(params);
      // 生成树形结构
      tableData.value = [];
      // 使用 Map 来存储已存在的数据，以提高查找性能
      const tableDataMap = new Map();

      tableData.value.forEach((__data) => {
        // 将已存在的数据存储在 Map 中，以 dateRecorded 作为键
        tableDataMap.set(__data.dateRecorded, __data);
      });

      data.forEach((_data) => {
        const existingData = tableDataMap.get(_data.dateRecorded);
        if (existingData) {
          // 如果已存在数据，直接添加到 children 数组中
          existingData.children.push(_data);
        } else {
          // 否则，将新数据添加到 tableData.value 中
          _data.children = [];
          tableData.value.push(_data);
          if (_data.id) expandedKeys.value.push(_data.id);
          // 并将其存储在 Map 中，以便后续查找
          tableDataMap.set(_data.dateRecorded, _data);
        }
      });
    } catch (err) {
      window.console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();

  const summary = ({ columns, data }) => {
    const countData = {
      weightKg: 0,
      totalPackage: 0,
    };
    data.forEach(
      (record: {
        weightKg: number;
        totalPackage: number;
        children: [{ weightKg: number; totalPackage: number }];
      }) => {
        countData.weightKg += record.weightKg;
        countData.totalPackage += record.totalPackage;
        record.children.forEach(
          (c: { weightKg: number; totalPackage: number }) => {
            countData.weightKg += c.weightKg;
            countData.totalPackage += c.totalPackage;
          }
        );
      }
    );
    return [
      {
        packageNumber: '总计',
        weightKg: `${countData.weightKg.toFixed(0)} kg`,
        totalPackage: countData.totalPackage.toFixed(0),
      },
    ];
  };

  const customRequest = (option: {
    onProgress: any;
    onError: any;
    onSuccess: any;
    fileItem: any;
    name: any;
  }) => {
    const { onProgress, onError, onSuccess, fileItem, name } = option;

    const isXLSX =
      fileItem.file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isXLSX) {
      Message.error('只能上传 xlsx 文件');
      return;
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

      return true;
    };

    const formData = new FormData();
    formData.append(name || 'file', fileItem.file);
    xhr.open('post', `${import.meta.env.VITE_API_BASE_URL}/api/scrap`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    xhr.send(formData);
  };

  const archiveFormRef = ref<any>();
  const archiveClick = () => {
    const dateRecordedArray = tableData.value.map((item) =>
      new Date(item.dateRecorded as string).getTime()
    );

    if (dateRecordedArray.length > 0) {
      const minDate = new Date(Math.min(...dateRecordedArray));
      const maxDate = new Date(Math.max(...dateRecordedArray));

      archiveFormRef.value.initForm(
        formatDate(minDate.toLocaleString()),
        formatDate(maxDate.toLocaleString())
      );
    } else {
      Message.error('当前数据为空, 不需要归档统计');
    }
  };

  const scrapStatisticsRef = ref<any>();
  const scrapStatisticsClick = () => {
    scrapStatisticsRef.value.initial();
  };
</script>

<script lang="ts">
  export default {
    name: 'Scrap',
  };
</script>

<style lang="less" scoped></style>
