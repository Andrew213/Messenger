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

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        open: true,
    },
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json'],
        alias: {
            '@': path.resolve(appDirectory, './src'),
            '@fonts': path.resolve(appDirectory, './public/fonts'),
            '@img': path.resolve(appDirectory, './src/img'),
            '@hooks': path.resolve(appDirectory, './src/hooks'),
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
                        loader: 'esbuild-loader',
                        options: {
                            // JavaScript version to compile to
                            target: 'es2015',
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
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
