## Foo

Demo:

```tsx
import React from 'react';
import { Pipeline } from 'dw-interview-component';

export default () => (
  <Pipeline
    stages={[
      {
        title: '编译',
        jobs: [
          {
            name: '编译',
            status: 'success',
            time: '00:00:05',
          },
        ],
      },
      {
        title: '部署',
        jobs: [
          {
            name: '部署',
            status: 'success',
            time: '00:01:05',
          },
        ],
      },
      {
        title: '代码扫描和检查',
        jobs: [
          {
            name: 'STC',
            status: 'success',
            time: '00:10:03',
          },
          {
            name: 'PMD',
            status: 'success',
            time: '00:02:15',
          },
          {
            name: 'PMD2',
            status: 'success',
            time: '00:02:15',
          },
        ],
      },
      {
        title: '集成测试',
        jobs: [
          {
            name: '集成测试',
            status: 'success',
            time: '00:00:05',
          },
          {
            name: '单元测试',
            status: 'success',
            time: '00:00:05',
          },
        ],
      },
    ]}
  />
);
```
