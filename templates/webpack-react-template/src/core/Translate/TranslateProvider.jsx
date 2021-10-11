/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { ConfigProvider, Space, Spin } from 'antd';
import { useSharedState } from 'core/hooks';
import { useCallback, useState } from 'react';
import { useAction } from 'use-action';
import zhCN from 'antd/es/locale/zh_CN';
import jaJP from 'antd/es/locale/ja_JP';
import 'moment/locale/zh-cn';
import 'moment/locale/ja';
// import moment from 'moment';

export const useTranslateState = useSharedState({
    language: {},
    local: 'cn_ZH',
    loaded: false,
});

const configProviderMapper = {
    ja_JP: jaJP,
    cn_ZH: zhCN,
};

const DelayLoading = () => {
    const [visible, toggleVisible] = useState(false);

    useAction(() => {
        // 延迟展示，防止网络速度过快造成的闪屏问题
        setTimeout(() => {
            toggleVisible(true);
        }, 120);
    }, []);
    return (
        <Space>
            <Spin
                size="small"
                style={{
                    visibility: !visible ? 'hidden' : 'unset',
                }}
            />
        </Space>
    );
};

export const useTranslate = () => {
    const [translate, setTranslate] = useTranslateState();
    const { language, loaded } = translate;

    const translateFunc = useCallback((code) => {
        if (!loaded) {
            return <DelayLoading />;
        }
        return language[code] || code;
    }, [language, loaded]);

    return { translateState: translate, setTranslate, translate: translateFunc };
};

export const TranslateProvider = ({ onLangChange = () => { }, children }) => {
    const localLang = localStorage.getItem('local') || 'cn_ZH';

    const { translateState, setTranslate } = useTranslate();

    useAction(() => {
        window.document.body.lang = localLang;
    }, [localLang]);

    return (
        <ConfigProvider
            locale={configProviderMapper[localLang]}
        >
            {translateState.loaded ? children : null}
        </ConfigProvider>
    );
};
