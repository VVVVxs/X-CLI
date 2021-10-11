const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const os = require('os');

const PATH_NODE_MODULES = path.resolve(__dirname, '../node_modules/');
const PATH_SRC = path.resolve(__dirname, '../src/');

module.exports = {
    entry: {
        'japan-anchor-crm': ['@babel/polyfill', './src/index.js'],
    },

    plugins: [
        new ProgressBarPlugin(),
        // 在开发时不需要每个页面都引用React
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new MiniCssExtractPlugin({
            filename: 'static/[name].[chunkhash:8].css',
            chunkFilename: 'static/[name].[chunkhash:8].css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '../static'), to: path.resolve(__dirname, '../dist/static') },
        ]),
        // new webpack.EnvironmentPlugin(['env']),
    ],

    output: {
        filename: 'static/[name].[hash].js',
        chunkFilename: 'static/[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        jsonpFunction: `webpackJsonp`,
    },

    resolve: {
        alias: {
            util: path.resolve(__dirname, '../src/util/'),
            services: path.resolve(__dirname, '../src/services/'),
            components: path.resolve(__dirname, '../src/components/'),
            config: path.resolve(__dirname, '../src/config/'),
            core: path.resolve(__dirname, '../src/core/'),
            '@': path.resolve(__dirname, '../src/'),
        },
        extensions: ['.js', '.jsx'], // require时省略的扩展名,如：require('module') 不需要module.js
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 转化ES6语法
                include: [PATH_SRC],
                exclude: [PATH_NODE_MODULES],
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('.cache-loader'),
                        },
                    },
                    {
                        loader: 'thread-loader',
                        // 有同样配置的 loader 会共享一个 worker 池(worker pool)
                        options: {
                            workers: os.cpus().length - 1, // 产生的 worker 的数量，默认是 cpu 的核心数
                            workerParallelJobs: 50, // 一个 worker 进程中并行执行工作的数量
                            poolTimeout: 2000, // 闲置时定时删除 worker 进程
                            // 池(pool)分配给 worker 的工作数量
                            // 默认为 200
                            // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
                            poolParallelJobs: 50,
                            // 池(pool)的名称
                            // 可以修改名称来创建其余选项都一样的池(pool)
                            name: 'my-pool',
                        },
                    },
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                oneOf: [
                    {
                        test: /\.module\.less$/, // 处理本地module.less样式文件，开启css module功能
                        include: [PATH_SRC],
                        exclude: [PATH_NODE_MODULES],
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                },
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.less$/, // 处理本地.less样式文件依赖中的less，不开启css module功能
                        include: [PATH_NODE_MODULES, PATH_SRC],
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // 增加 externals
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    //     'prop-types': 'PropTypes',
    //     axios: 'axios',
    //     moment: 'moment',
    // },
};
