// @ts-nocheck
import React from 'react';


export default {
  'Pipeline-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/wens/Documents/dw-interview-component/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _dwInterviewComponent = require("dw-interview-component");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_dwInterviewComponent.Pipeline, {
      stages: [{
        title: '编译',
        jobs: [{
          name: '编译',
          status: 'success',
          time: '00:00:05'
        }]
      }, {
        title: '部署',
        jobs: [{
          name: '部署',
          status: 'success',
          time: '00:01:05'
        }]
      }, {
        title: '代码扫描和检查',
        jobs: [{
          name: 'STC',
          status: 'success',
          time: '00:10:03'
        }, {
          name: 'PMD',
          status: 'success',
          time: '00:02:15'
        }, {
          name: 'PMD2',
          status: 'success',
          time: '00:02:15'
        }]
      }, {
        title: '集成测试',
        jobs: [{
          name: '集成测试',
          status: 'success',
          time: '00:00:05'
        }, {
          name: '单元测试',
          status: 'success',
          time: '00:00:05'
        }]
      }]
    });
  };

  return _react["default"].createElement(_default);
},
  },
};
