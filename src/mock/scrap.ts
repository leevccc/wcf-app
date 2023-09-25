import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import Mock from 'mockjs';

setupMock({
  mock: import.meta.env.VITE_DEV_MOCK === 'true',
  setup() {
    Mock.mock(new RegExp('/api/scrap'), () => {
      return successResponseWrap([
        {
          id: 1,
          dateRecorded: '2022-07-30T16:00:00.000+00:00',
          packageNumber: 1,
          weightKg: 14.56,
          totalPackage: 1,
          comments: null,
          archive: false,
          createTime: '2023-09-25T05:20:11.000+00:00',
          updateTime: '2023-09-25T05:20:11.000+00:00',
        },
        {
          id: 2,
          dateRecorded: '2022-07-30T16:00:00.000+00:00',
          packageNumber: 2,
          weightKg: 14.56,
          totalPackage: 1,
          comments: null,
          archive: false,
          createTime: '2023-09-25T05:20:11.000+00:00',
          updateTime: '2023-09-25T05:20:11.000+00:00',
        },
        {
          id: 3,
          dateRecorded: '2022-07-30T16:00:00.000+00:00',
          packageNumber: 3,
          weightKg: 9.645,
          totalPackage: 1,
          comments: null,
          archive: false,
          createTime: '2023-09-25T05:20:11.000+00:00',
          updateTime: '2023-09-25T05:20:11.000+00:00',
        },
      ]);
    });
  },
});
