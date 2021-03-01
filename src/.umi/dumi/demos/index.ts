// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';

export default {
  'Pipeline-demo': {
    component: () => React.createElement(dynamic({
      loader: async function() {
        const { default: demos } = await import(/* webpackChunkName: "demos_enilepiP" */'./Pipeline');

        return demos['Pipeline-demo'].component;
      },
      loading: () => null,
    })),
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Pipeline } from 'dw-interview-component';\n\nexport default () => (\n  <Pipeline\n    stages={[\n      {\n        title: '编译',\n        jobs: [\n          {\n            name: '编译',\n            status: 'success',\n            time: '00:00:05',\n          },\n        ],\n      },\n      {\n        title: '部署',\n        jobs: [\n          {\n            name: '部署',\n            status: 'success',\n            time: '00:01:05',\n          },\n        ],\n      },\n      {\n        title: '代码扫描和检查',\n        jobs: [\n          {\n            name: 'STC',\n            status: 'success',\n            time: '00:10:03',\n          },\n          {\n            name: 'PMD',\n            status: 'success',\n            time: '00:02:15',\n          },\n          {\n            name: 'PMD2',\n            status: 'success',\n            time: '00:02:15',\n          },\n        ],\n      },\n      {\n        title: '集成测试',\n        jobs: [\n          {\n            name: '集成测试',\n            status: 'success',\n            time: '00:00:05',\n          },\n          {\n            name: '单元测试',\n            status: 'success',\n            time: '00:00:05',\n          },\n        ],\n      },\n    ]}\n  />\n);"}},"dependencies":{"react":{"version":"16.14.0"},"dw-interview-component":{"version":"1.0.0"}},"componentName":"Pipeline","identifier":"Pipeline-demo"},
  },
};
