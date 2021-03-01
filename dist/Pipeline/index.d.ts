import { ReactNode } from 'react';
import './style.less';
interface IPipeline {
    stages: IStage[];
}
interface IStage {
    title: string;
    jobs: IJob[];
}
interface IJob {
    name: string;
    status: 'success' | 'fail';
    time: number;
}
declare const _default: (props: IPipeline) => ReactNode;
export default _default;
