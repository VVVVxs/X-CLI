import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import routeConfig from '@/router/RouteConfig';

const MenuList = ({ menuData, app, getTitle }) => {
    const [selectedKey, setSelectedKey] = useState('');

    const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';

    useEffect(() => {
        const currentPath = window.location.hash.split('/')[1];
        setSelectedKey(currentPath);
        const currentMenu = routeConfig().find((val) => val.key === currentPath);
        if (currentMenu) {
            getTitle(currentMenu.title);
        }
    }, []);

    // 生成菜单
    const getMenu = (data) => data.map((item) => {
        return (
            <Menu.Item
                key={item.key}
                onClick={getTitle.bind(null, item.title)}
                url={item.url}
            >
                <span>
                    {item.title}
                </span>
            </Menu.Item>
        );
    });

    if (!isArray(menuData)) {
        throw new Error('菜单列表，请传入数组');
    }
    const menuList = getMenu(routeConfig());

    const changeSelectedKey = (e) => {
        setSelectedKey(e.key);
        app._history.push(e.key);
    };

    return (
        <Menu
            theme="line-height"
            mode="inline"
            className="menu-list"
            selectedKeys={[selectedKey]}
            onClick={changeSelectedKey}
        >
            {menuList}
        </Menu>
    );
};

export default MenuList;
