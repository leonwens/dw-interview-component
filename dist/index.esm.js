import React, { useRef, useLayoutEffect, forwardRef, useImperativeHandle } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "h1 {\n  margin: 0;\n  padding: 0;\n}\n.pipeline {\n  display: flex;\n  align-items: flex-start;\n}\n.job {\n  max-width: 160px;\n  padding: 10px 30px 10px 10px;\n  border: 1px solid #000;\n  border-radius: 50px;\n  display: flex;\n  align-items: center;\n}\n.job__icon {\n  width: 16px;\n  height: 16px;\n  margin-right: 10px;\n}\n.job__name {\n  margin-right: auto;\n}\n.job__text {\n  font-size: 16px;\n  line-height: 16px;\n  color: rgba(0, 0, 0, 0.8);\n}\n.stage__title {\n  font-size: 16px;\n  line-height: 16px;\n  color: #000000;\n  margin-bottom: 20px;\n}\n.stage__content {\n  display: flex;\n}\n.connector {\n  width: 50px;\n  height: 1px;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n";
styleInject(css_248z);

function Connector(props) {
  var CANVAS_WIDTH = 85;
  var JOB_HEIGHT = 40;
  var leftNumber = props.leftNumber,
      rightNumber = props.rightNumber;
  var canvasRef = useRef(null);

  var draw = function draw(canvasDom) {
    var oJob = document.getElementsByClassName('job')[0];
    var clientHeight = oJob.clientHeight;
    var ctx = canvasDom.getContext('2d');
    var initStartY = clientHeight / 2;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();

    while (leftNumber > 0) {
      leftNumber--;
      ctx.moveTo(0, initStartY + leftNumber * clientHeight);

      if (leftNumber === 0) {
        ctx.lineTo(CANVAS_WIDTH, initStartY + leftNumber * clientHeight);
      } else {
        ctx.bezierCurveTo(CANVAS_WIDTH / 3, initStartY + leftNumber * clientHeight, 0, initStartY, CANVAS_WIDTH / 3, initStartY);
      }
    }

    while (rightNumber > 1) {
      rightNumber--;
      ctx.moveTo(CANVAS_WIDTH, initStartY + rightNumber * clientHeight);
      ctx.bezierCurveTo(2 * CANVAS_WIDTH / 3, initStartY + rightNumber * clientHeight, CANVAS_WIDTH, initStartY, 2 * CANVAS_WIDTH / 3, initStartY);
    }

    ctx.stroke();
  };

  useLayoutEffect(function () {
    if (canvasRef.current) {
      draw(canvasRef.current);
    }
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: CANVAS_WIDTH,
    height: JOB_HEIGHT * Math.max(leftNumber, rightNumber)
  });
}

var Job = /*#__PURE__*/forwardRef(function (props, ref) {
  var name = props.name,
      status = props.status,
      time = props.time;
  var jobRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      getDom: function getDom() {
        return jobRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "job",
    ref: jobRef
  }, /*#__PURE__*/React.createElement("img", {
    className: "job__icon",
    src: status
  }), /*#__PURE__*/React.createElement("span", {
    className: "job__text job__name"
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "job__text"
  }, time));
});

function Stage(props) {
  var _props$data = props.data,
      title = _props$data.title,
      jobs = _props$data.jobs,
      connectorProps = props.connectorProps; // const jobRef = useRef<IJobEventHandles>(null);
  // useLayoutEffect(() => {
  //   if (jobRef) {
  //     console.log(jobRef.current?.getDom().clientHeight);
  //   }
  // }, []);

  return /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "stage__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "stage__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage__jobList"
  }, jobs.map(function (jobItem, index) {
    return /*#__PURE__*/React.createElement(Job, Object.assign({
      key: index
    }, jobItem));
  })), connectorProps && /*#__PURE__*/React.createElement(Connector, Object.assign({}, connectorProps))));
}

var index = (function (props) {
  var stages = props.stages;
  return /*#__PURE__*/React.createElement("div", {
    className: "pipeline"
  }, stages.map(function (stageItem, index) {
    return /*#__PURE__*/React.createElement(Stage, {
      key: stageItem.title,
      data: stageItem,
      connectorProps: stages[index + 1] && {
        leftNumber: stages[index].jobs.length,
        rightNumber: stages[index + 1].jobs.length
      }
    });
  }));
});

export { index as Pipeline };
