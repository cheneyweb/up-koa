var nodeExternals = require('webpack-node-externals')
module.exports = {
    // 入口文件，指向app.js
    entry: {
        dist: './app.js'
    },
    // 出口文件
    output: {
        path: __dirname,
        // 文件名，将打包好的导出为build.js
        filename: 'build.js'
    },
    externals: [nodeExternals()],
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 写法一
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env'],
                    plugins: ['transform-runtime']
                }
                // 上面的写法和下面的写法都可以，除此之外，options的内容放在.babelrc文件里也可以
                // 写法二
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['babel-preset-env'],
                //         plugins: ['transform-runtime']
                //     }
                // }
            }
        ]
    }
}