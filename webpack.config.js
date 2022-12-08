const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { resolve } = require('path');

let config = {
    mode: 'development',
    devtool: "source-map",
    entry: resolve(__dirname, 'src', 'js','main.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'static/js/bundle.js'
    },
    resolve: {
        extensions: ['.js','.mjs', '.json', '.css'],
        modules: [resolve(__dirname), "node_modules"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:
                './index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './static',
                    to: './static'
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?(js)$/,
                include: resolve(__dirname, 'src','js'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ ['@babel/preset-env', { "targets": "defaults" }]],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.(svg|gif|png|ico|jpg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './static/img/[name]-[hash][ext]',
                },

            },
            {
                test: /\.(eot|woff(2)?|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: './static/font/[name]-[hash][ext]',
                },

            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true
    }
};

let cssConfig = {
    test: /\.css$/,
    use: [
        'css-loader'
    ]
};

module.exports = (env, argv) => {

    if (argv.mode === 'production') {
        config.output.publicPath = './';
        cssConfig.use.unshift(MiniCssExtractPlugin.loader);
        config.module.rules.push(cssConfig);

        return config;
    }

    config.output.publicPath = 'auto';
    cssConfig.use.unshift('style-loader');
    config.module.rules.push(cssConfig);

    return config;
};