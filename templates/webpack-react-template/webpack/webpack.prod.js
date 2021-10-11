const path = require('path');
const merge = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: 'static/[name].[chunkhash:8].min.js',
        chunkFilename: 'static/[name].[chunkhash:8].min.js',
        crossOriginLoading: 'anonymous',
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({ // html插件
            template: path.resolve(__dirname, '../src/index.ejs'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            chunksSortMode: 'none',
        }),
        new ScriptExtHtmlWebpackPlugin({
            custom: {
                test: /\.js$/,
                attribute: 'crossorigin',
                value: 'anonymous',
            },
            preload: {
                test: /\.js$/,
            },
        }),
    ],
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        limit: 11920,
                        name: `static/img/[name].[ext]`,
                    },
                },
            ],
        }],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    enforce: true,
                },
                antd: {
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    name: 'antd',
                    chunks: 'all',
                    enforce: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'async',
                    enforce: true,
                },
                default: false,
            },
        },
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    // 打包时候自动删除debugger和console的调用代码
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    // 打包时自动删除注释，减小文件体积
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});
