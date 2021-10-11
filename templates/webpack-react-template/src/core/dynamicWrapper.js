import dynamic from 'dva/dynamic';
import { createElement } from 'react';

// let routerDataCache;

const modelNotExisted = (app, model) =>
    // eslint-disable-next-line
    !app._models.some(({ namespace }) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });

export default (app, models, component) => {
    if (component.toString().indexOf('.then(') < 0) {
        models.forEach((model) => {
            if (modelNotExisted(app, model)) {
                // eslint-disable-next-line
                app.model(require(`../models/${model}.js`).default)
            }
        });
        return (props) => {
            // if (!routerDataCache) {
            //     routerDataCache = routeConfig(app);
            // }
            return (component().default, {
                ...props,
                // routerData: routerDataCache,
            });
        };
    }

    return dynamic({
        app,
        models: () => models.filter((model) => modelNotExisted(app, model)).map((m) => import(`../models/${m}.js`)),
        component: () => {
            // if (!routerDataCache) {
            //     routerDataCache = routeConfig(app);
            // }
            return component().then((raw) => {
                const Component = raw.default || raw;
                return (props) => createElement(Component, {
                    ...props,
                    // routerData: routerDataCache,
                });
            });
        },
    });
};
