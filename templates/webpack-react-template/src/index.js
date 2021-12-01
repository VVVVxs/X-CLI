/* eslint-disable react/jsx-filename-extension */
/**
 * 应用入口。
 *
 * @author    姚尧 <yaoyao2@douyu.tv>
 * @copyright © 2017 DouYu.tv
 */

import React, { Suspense } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { HashRouter } from 'react-router-dom';
import Loading from './components/Loading';
import App from './pages/App';
import 'animate.css';
import './styles/global.less';

// 创建dva实例
const appIns = dva();

// 给APP注册model
appIns.model(require('./models/global').default);

// 使用dva-loading
appIns.use(createLoading());


// 配置hooks或者注册插件
// 注册loading插件
appIns.use(createLoading());
// 注册immer插件
appIns.use(require('dva-immer').default());


appIns.router(({ app }) => {
    // eslint-disable-next-line react/jsx-filename-extension
    return (<Suspense fallback={<Loading />}>
            <HashRouter>
                <App app={app} />
            </HashRouter>
        </Suspense>);
});

// -> Start
appIns.start('#app');
