import React, {
  ReactNode,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import './style.less';
interface IJobEventHandles {
  getDom(): HTMLElement;
}

interface IPipeline {
  stages: IStage[];
}
interface IStageProps {
  data: IStage;
  connectorProps?: IConnectorProps;
}
interface IStage {
  title: string;
  jobs: IJob[];
}

interface IJob {
  name: string;
  status: 'success' | 'fail';
  time: number; // 毫秒时间戳
}
interface IConnectorProps {
  leftNumber: number;
  rightNumber: number;
}
function Connector(props: IConnectorProps) {
  const CANVAS_WIDTH = 85;
  const JOB_HEIGHT = 40;
  let { leftNumber, rightNumber } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = function(canvasDom: HTMLCanvasElement) {
    const oJob = document.getElementsByClassName('job')[0];
    const { clientHeight } = oJob;
    const ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D;
    const initStartY = clientHeight / 2;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    while (leftNumber > 0) {
      leftNumber--;
      ctx.moveTo(0, initStartY + leftNumber * clientHeight);
      if (leftNumber === 0) {
        ctx.lineTo(CANVAS_WIDTH, initStartY + leftNumber * clientHeight);
      } else {
        ctx.bezierCurveTo(
          CANVAS_WIDTH / 3,
          initStartY + leftNumber * clientHeight,
          0,
          initStartY,
          CANVAS_WIDTH / 3,
          initStartY,
        );
      }
    }
    while (rightNumber > 1) {
      rightNumber--;
      ctx.moveTo(CANVAS_WIDTH, initStartY + rightNumber * clientHeight);
      ctx.bezierCurveTo(
        (2 * CANVAS_WIDTH) / 3,
        initStartY + rightNumber * clientHeight,
        CANVAS_WIDTH,
        initStartY,
        (2 * CANVAS_WIDTH) / 3,
        initStartY,
      );
    }
    ctx.stroke();
  };
  useLayoutEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current);
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={JOB_HEIGHT * Math.max(leftNumber, rightNumber)}
    ></canvas>
  );
}
const Job = forwardRef<IJobEventHandles, IJob>((props, ref) => {
  const { name, status, time } = props;
  const jobRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    getDom: () => {
      return jobRef.current!;
    },
  }));

  return (
    <div className="job" ref={jobRef}>
      <img className="job__icon" src={status} />
      <span className="job__text job__name">{name}</span>
      <span className="job__text">{time}</span>
    </div>
  );
});
function Stage(props: IStageProps) {
  const {
    data: { title, jobs },
    connectorProps,
  } = props;
  // const jobRef = useRef<IJobEventHandles>(null);
  // useLayoutEffect(() => {
  //   if (jobRef) {
  //     console.log(jobRef.current?.getDom().clientHeight);
  //   }
  // }, []);
  return (
    <div className="stage">
      <h1 className="stage__title">{title}</h1>
      <div className="stage__content">
        <div className="stage__jobList">
          {jobs.map((jobItem, index) => {
            return <Job key={index} {...jobItem}></Job>;
          })}
        </div>
        {connectorProps && <Connector {...connectorProps}></Connector>}
      </div>
    </div>
  );
}
export default (props: IPipeline): ReactNode => {
  const { stages } = props;
  return (
    <div className="pipeline">
      {stages.map((stageItem, index) => {
        return (
          <Stage
            key={stageItem.title}
            data={stageItem}
            connectorProps={
              stages[index + 1] && {
                leftNumber: stages[index].jobs.length,
                rightNumber: stages[index + 1].jobs.length,
              }
            }
          ></Stage>
        );
      })}
    </div>
  );
};
