import React from 'react';
import { Spin } from 'antd';
import Style from './index.less';

export default () => (
    <div>
        <div className={Style.loading} />
        <Spin tip="Loading..." size="large" className={Style.spin} />
    </div>
);
