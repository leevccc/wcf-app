<template>
  <a-modal
    v-model:visible="visible"
    title="周数据"
    fullscreen
    @cancel="handleCancel"
  >
    <a-row style="margin-bottom: 16px">
      <a-col :flex="1">
        <a-form
          :model="form"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
          label-align="left"
        >
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item field="from" label="开始日期">
                <a-date-picker v-model="form.from" format="YYYY-MM-DD" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item field="end" label="截至日期">
                <a-date-picker v-model="form.end" format="YYYY-MM-DD" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-divider style="height: 84px" direction="vertical" />
      <a-col :flex="'86px'" style="text-align: right">
        <a-space direction="vertical" :size="18">
          <a-button type="primary" @click="fetchData">
            <template #icon>
              <icon-search />
            </template>
            加载
          </a-button>
          <a-button @click="resetClick">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-divider style="margin-top: 0" />
    <Chart v-if="visible" height="400px" :option="chartOption" />
  </a-modal>
</template>

<script lang="ts" setup>
  import useChartOption from '@/hooks/chart-option';
  import { reactive, ref } from 'vue';
  import { getScrapWeekRecord, ScrapWeekRecordForm } from '@/api/scrap';
  import { diffDay, formatDate } from '@/utils/date';

  const form = reactive<ScrapWeekRecordForm>({
    from: undefined,
    end: undefined,
  });

  const visible = ref(false);
  const handleCancel = () => {
    visible.value = false;
  };
  const initial = () => {
    visible.value = true;
  };
  defineExpose({ initial });

  const fetchData = async () => {
    try {
      xAxis.value = [];
      weightData.value = [];
      packageData.value = [];
      const { data } = await getScrapWeekRecord(form);
      let lastDay: string = data[0][0];
      data.forEach((_data: any) => {
        if (diffDay(lastDay, _data[0]) >= 10) {
          xAxis.value.push('隔');
          weightData.value.push(0);
          packageData.value.push(0);
        }
        xAxis.value.push(formatDate(_data[0]));
        weightData.value.push(_data[1]);
        packageData.value.push(_data[2]);
        lastDay = _data[0] as string;
      });
    } catch (error) {
      window.console.log(error);
    }
  };

  const resetClick = () => {
    form.from = undefined;
    form.end = undefined;
  };

  const xAxis = ref<string[]>([]);
  const weightData = ref<number[]>([]);
  const packageData = ref<number[]>([]);

  const { chartOption } = useChartOption(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: xAxis.value,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '袋子数',
          type: 'line',
          smooth: true,
          barWidth: '60%',
          data: packageData.value,
          itemStyle: {
            color: 'red',
          },
        },
        {
          name: '重量/kg',
          type: 'bar',
          barWidth: '60%',
          data: weightData.value,
          yAxisIndex: 1,
        },
      ],
    };
  });
</script>

<script lang="ts">
  export default {
    name: 'ScrapWeekChart',
  };
</script>

<style lang="less" scoped></style>
