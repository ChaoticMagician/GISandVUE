const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isdev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname,'../src/main.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname,'../dist')
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]',
                            overlay: {
                                errors: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isdev ? '"development"' : '"production"'
            }
        }),

        new HtmlPlugin()

    ]
}

if(isdev){
    config.devtool = '#cheap-module-eval-sourece-map'
    config.devServer = {
        port: 8071,
        host: '0.0.0.0',
        overlay: {
            errors: true
        }
        // hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config