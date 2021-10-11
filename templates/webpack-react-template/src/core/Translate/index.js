/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */
import { TranslateProvider, useTranslate, useTranslateState } from './TranslateProvider';

export { default as TranslateText } from './TranslateText';
export { default as TranslateSpan } from './TranslateSpan';

export { TranslateProvider, useTranslate, useTranslateState };

export const translate = (code) => {
    const { language } = useTranslateState.data;

    return language[code] || code;
};
