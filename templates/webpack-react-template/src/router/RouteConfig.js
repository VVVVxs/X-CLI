/* eslint-disable max-len */
/**
 * 定义路由配置。
 *
 * @author    薛松 <songsong@douyu.tv>
 * @copyright © 2020 DouYu.tv
 */
import dynamicWrapper from 'core/dynamicWrapper';
import TestComponent from '@/pages/Test';
// import PageDefault from 'components/PageDefault/index';


const routeConfig = (app) => [
    {
        path: '/',
        key: '/',
        title: '首页',
        component: dynamicWrapper(app, ['global'], () => import('components/PageDefault/index')),
        breadcrumbName: '欢迎登录',
    },
    {
        path: '/home',
        key: 'home',
        title: '测试',
        component: TestComponent,
        breadcrumbName: '欢迎登录',
    },
];
export default routeConfig;
