/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { useTranslate } from './TranslateProvider';

const TranslateText = ({ code }) => {
    const { translate } = useTranslate();
    return (
        <>{translate(code)}</>
    );
};

export default TranslateText;
