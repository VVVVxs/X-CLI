/**
 * 定义入口视图组件。
 *
 * @author    薛松 <songsong@douyu.tv>
 * @copyright © 2020 DouYu.tv
 */

import React, { useEffect, useState } from 'react';
import { Layout, Select } from 'antd';
import { connect } from 'dva';
import MenuList from 'components/MenuList';
import Permission from 'components/Permission';
import LogOut from 'components/logOut';
import RouterGenerator from '../router/Router';


const { Header, Content, Sider } = Layout;

const mapStateToProps = (state) => {
    return {
        global: state.global,
    };
};

const App = ({ dispatch, app, global }) => {
    const { userInfo = {} } = global;
    const [title, setTitle] = useState('首页');

    useEffect(() => {
        dispatch({ type: 'global/getUserInfo' }).then((res) => {
            dispatch({
                type: 'global/save',
                payload: {
                    userInfo: res || {},
                },
            });
        });
        const lastUrl = window.localStorage.getItem('lastUrl');
        if (lastUrl) {
            window.localStorage.removeItem('lastUrl');
            window.location.href = lastUrl;
        }
    }, []);

    const changeLanguage = (val) => {
        localStorage.setItem('local', val);
        window.location.reload();
    };

    return (
        <Layout className="crm-container">
            <Sider width={250} className="crm-menu">
                <h1 style={{ color: '#fff', height: 100, padding: 20, fontSize: 28 }}>CRM</h1>
                <MenuList
                    menuData={userInfo.permissions || []}
                    app={app}
                    getTitle={(value) => { setTitle(value); }}
                />
            </Sider>
            <Layout className="main-container">
                <Header className="header">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ flex: 2 }}>{title}</h3>
                        <div style={{ marginRight: 10 }}>
                            <Select
                                onChange={changeLanguage}
                                style={{ width: 120 }}
                                value={localStorage.getItem('local') || 'cn_ZH'}
                            >
                                <Select.Option key="cn_ZH" value="cn_ZH">
                                    中文
                                </Select.Option>
                                <Select.Option key="ja_JP" value="ja_JP">
                                    英文
                                </Select.Option>
                            </Select>
                        </div>
                        <LogOut userInfo={userInfo} logoutUrl="/api/crm/logout" />
                    </div>
                </Header>
                <Content className="content-container">
                    <div style={{ background: '#fff', padding: 10 }}>
                        {RouterGenerator.genRouter(app)}
                    </div>
                </Content>
                <Permission />
            </Layout>
        </Layout>
    );
};

export default connect(mapStateToProps, null)(App);
