const HtmlWebpackPlugin = require('html-webpack-plugin');
const getPath = (p) => {
    return __dirname + '/' + p
}
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        publicPath: "http://localhost:8888/",
    },
    devServer: {
        compress: true, //启动压缩 gzip
        port: 8888,
        historyApiFallback: true,
    },
    resolve:{
        alias:{
            // 'redux': getPath('redux'),
            // 'connected-react-router': getPath('connected-react-router'),
            // 'react-redux': getPath('react-redux'),
            // 'redux-saga': getPath('redux-saga'),
        }
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            // include: [
            //     getPath('src'),
            //     getPath('connected-react-router'),
            //     getPath('react-redux'),
            //     getPath('redux')
            // ],
            use: {
                loader: 'babel-loader',
                options: {
                    plugins:[
                        '@babel/plugin-transform-runtime'
                    ],
                    presets: [
                        [
                            "@babel/preset-env",
                        ], "@babel/preset-react"
                    ]
                }

            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        ]
    },
    plugins: [
        //插件可以插入webpack打包整个流程，执行
        //这个插件会向输出目录写入一个index.html文件，并且会入文件里插入打包后的脚本
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: { //压缩HTML
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ]
}