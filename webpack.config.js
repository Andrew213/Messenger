const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

dotenv.config();

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const localIdentName = devMode ? '[path][name]__[local]' : '[hash:base64]';

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    mode,
    target: target,
    devtool,
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        liveReload: false,
    },
    entry: {
        app: path.resolve(__dirname, 'src', 'index.ts'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json'],
        alias: {
            '@': path.resolve(appDirectory, './src'),
            '@fonts': path.resolve(appDirectory, './public/fonts'),
            '@img': path.resolve(appDirectory, './src/img'),
            '@hooks': path.resolve(appDirectory, './src/hooks'),
            '@block': path.resolve(appDirectory, './src/core/'),
            '@styles': path.resolve(appDirectory, './src/styles'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'index.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        // options: {
                        //     // JavaScript version to compile to
                        //     target: 'ESNEXT',
                        // },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName,
                                exportLocalsConvention: 'camelCase',
                                auto: resourcePath => resourcePath.endsWith('.module.less'),
                            },
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
};
