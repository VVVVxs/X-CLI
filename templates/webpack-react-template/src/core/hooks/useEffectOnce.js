/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { useEffect } from 'react';

const useEffectOnce = (effect) => {
    useEffect(effect, []);
};

export default useEffectOnce;
