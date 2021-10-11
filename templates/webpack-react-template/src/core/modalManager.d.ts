/*
 * @description: 
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { ModalProps } from "antd/lib/modal";
import { FunctionComponent } from "react";

interface ManagedModalInstance<P = {}> {
    destroy: () => void;
    update: (props: P) => void;
}

interface IModalProps extends ModalProps {
    onActionSuccess?: () => void;
};

type MountFunc<P extends IModalProps> = (props: P) => ManagedModalInstance<P>;

interface ManagedModal<P extends IModalProps> extends FunctionComponent<P> {
    mount: MountFunc<P>;
}

interface DefaultProps {
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
    afterClose: () => void;
}

interface genDefaultPropsOptions {
    update: () => {};
    destroy: () => {};
}

type genDefaultProps = (optons: genDefaultPropsOptions) => DefaultProps;

type ModalManagerFunction = <P extends IModalProps>(Component: ManagedModal<P>, genDefaultProps?: genDefaultProps) => ManagedModal<P>;


declare const modalManager: ModalManagerFunction;

export default modalManager;
