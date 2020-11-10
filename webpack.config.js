const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    //优化 禁止压缩 最小化
    optimization: {
        minimize: false
    },
    //多文件入口
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        detail: path.resolve(__dirname, './src/js/detail.js'),
        collections: path.resolve(__dirname, './src/js/collections.js'),
    },
    //输出/打包设置
    output: {
        //路径
        path: path.resolve(__dirname, './dist'),
        //打包后的文件名
        filename: 'js/[name].js'
    },
    //模块设置
    module: {
        //模块的匹配规则
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                use: [{
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            //在node开发版本下进行热更新
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    // 'style-loder',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 version')]
                            }
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
                loader: [
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    //插件
    plugins: [
        new uglify(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            title: '新闻头条',
            //多个chunk手动排序
            chunksSortMode: 'manual',
            chunks: ['index'],
            excludeChunks: ['node_modules'],
            hash: true,
            //压缩代码
            minify: {
                //删除注释
                removeComments: true,
                //删除空格换行
                collapseWhitespace: true
            }
        }),
        new miniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new htmlWebpackPlugin({
            filename: 'detail.html',
            template: path.resolve(__dirname, 'src/detail.html'),
            title: '新闻详情',
            chunks: ['index'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new htmlWebpackPlugin({
            filename: 'collections.html',
            template: path.resolve(__dirname, 'src/collections.html'),
            title: '我的新闻',
            chunks: ['index'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],
    //开发服务器的配置
    devServer: {
        watchOptions: {
            ignored: /\node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3000
    }
}