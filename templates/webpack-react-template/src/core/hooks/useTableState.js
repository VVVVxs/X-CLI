import { useRef, useState } from 'react';

/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

/**
 *
 * @param {*} searchFunc is a function will return one Promise that resolve { records, page, pageSize, total, pages }
 */
export default function useTableState(searchFunc = () => {}, transformResp) {
    const pageInfoRef = useRef({
        page: 1,
        pageSize: 20,
        total: 0,
        pages: 1,
    });
    // 列表
    const [records, setRecords] = useState([]);
    const [pageInfo, setPageInfo] = useState(pageInfoRef.current);
    const [searchHistory, setSearchHistory] = useState({});
    const [loading, setLoading] = useState(false);

    // 获取列表
    const getList = (params, useSearchHistory = true) => {
        setLoading(true);
        const newParams = {
            page: pageInfo.page,
            pageSize: pageInfo.pageSize,
            ...(useSearchHistory ? searchHistory : {}),
            ...params,
        };
        const resp = searchFunc(newParams);
        if (typeof resp.then === 'function') {
            resp
                .then((respData) => {
                    let data = respData;
                    if (transformResp) {
                        data = transformResp(respData, newParams);
                    }
                    const {
                        records: currentRecords,
                        page,
                        pageSize = 15,
                        total = 0,
                        // pages = Math.ceil(total / pageSize),
                    } = data;
                    setRecords(currentRecords);
                    setSearchHistory(newParams);
                    pageInfoRef.current = {
                        page,
                        pageSize,
                        total,
                        pages: Math.ceil(total / pageSize),
                    };
                    setPageInfo(pageInfoRef.current);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const updateListAfterDelete = () => {
        if (records.length === 1) {
            getList({
                page: (pageInfo.page - 1) || 1,
            }, true);
            return;
        }
        getList();
    };

    const updateListAfterCreate = () => {
        if (pageInfo.total % pageInfo.pageSize === 0) {
            getList({
                page: pageInfo.pages + 1,
            });
            return;
        }
        getList({
            page: pageInfo.pages,
        });
    };

    return {
        records,
        pageInfo,
        searchHistory,
        loading,
        getList,
        updateListAfterDelete,
        updateListAfterCreate,
    };
}
