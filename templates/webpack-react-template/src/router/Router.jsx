import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteConfig from './RouteConfig';

export default class RouterGenerator {
    // 根据路由规则生成路由节点
    static genRouter(app) {
        return (
            <Switch>
                {RouteConfig(app).map(
                    (route) => <Route
                        key={route.path}
                        exact
                        path={route.path}
                        render={(props) => <route.component {...props} />}
                    />,
                )}
            </Switch>

        );
    }
}
