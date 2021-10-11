const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apiMocker = require('webpack-api-mocker');

const common = require('./webpack.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({ // html插件
            template: path.resolve(__dirname, '../src/index.ejs'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            chunksSortMode: 'none',
        }),
        new webpack.HotModuleReplacementPlugin(),

        // new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 11920,
                    },
                }],
            },
        ],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: ip.address(),
        port: 8001,
        disableHostCheck: true,
        hot: true,
        inline: true,
        compress: true, // enable gzip compression
        quiet: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        setup(app) {
            apiMocker(app, path.resolve('./mock/index.js'), {
                changeHost: true,
            });
        },
    },
});
