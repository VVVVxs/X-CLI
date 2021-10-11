/**
 * @Description: 使组件可以已函数的方式进行调用，主要用户 modal 类型的组件
 * @Author: 周金顺（周大胖子）<zhoudapangzi@douyu.tv>
 * @Date: 2020-06-24 17:22:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-18 18:13:17
 */
import { unmountComponentAtNode, render as reactRender } from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { TranslateProvider } from './Translate';

/**
 * @param {update: () => {}, destroy => {}}
 * @returns {{visible: boolean, onCancel: onCancel, afterClose: afterClose, onOk: onOk}}
 */
function defaultGenProps({ update = () => {}, destroy = () => {} }) {
    return {
        visible: true,
        onCancel: () => {
            update({
                visible: false,
            });
        },
        onOk: () => {
            update({
                visible: false,
            });
        },
        afterClose: () => {
            destroy();
        },
    };
}

function computeDefaultProps(defaultProps, props = {}) {
    const {
        onCancel = () => {},
        onOk = () => {},
        afterClose = () => {},
        ...restProps
    } = defaultProps;
    const newProps = {
        ...restProps,
        ...props,
        onOk: (...args) => {
            onOk();
            if (typeof props.onOk === 'function') {
                props.onOk(...args);
            }
        },
        closeModal: (...args) => {
            onCancel();
            if (typeof props.onCancel === 'function') {
                props.onCancel(...args);
            }
        },
        onCancel: (...args) => {
            onCancel();
            if (typeof props.onCancel === 'function') {
                props.onCancel(...args);
            }
        },
        afterClose: (...args) => {
            afterClose();
            if (typeof props.afterClose === 'function') {
                props.afterClose(...args);
            }
        },
    };
    // console.log(newProps, 'newProps');
    return newProps;
}

/**
 * 将组件转化为函数方式挂载调用的形式
 * @param {*} Comp 组件, 需要转化的组件
 * @param {(instance: { destroy: () => {}, update: (config) => {} }) => null} genDefaultProps
 * 生成默认Props的方法, 接受一个参数（挂载器的实例， 可以销毁组件）
 */
export default function modalManager(Comp, genDefaultProps = defaultGenProps) {
    Comp.mount = (props) => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const destroy = () => {
            const unmounted = unmountComponentAtNode(div);
            if (unmounted && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        };

        const render = (propsConfig = {}) => {
            reactRender((
                <TranslateProvider>
                    <ConfigProvider locale={zhCN}>
                        <Comp
                            {...propsConfig}
                        />
                    </ConfigProvider>
                </TranslateProvider>
            ), div);
        };

        const instance = {
            destroy,
            update: (config) => {
                render(computeDefaultProps(genDefaultProps(instance), { ...props, ...config }) || {});
            },
        };

        render(computeDefaultProps(genDefaultProps(instance), props) || {});
        return instance;
    };

    return Comp;
}
