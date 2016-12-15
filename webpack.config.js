var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/entry.js'
    ],

    pathToPages: './src/html/pages',

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader!sass-loader"
                )
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),

        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry    : false
        }),

        new LiveReloadPlugin(),

        new webpack.OldWatchingPlugin(),

        new webpack.HotModuleReplacementPlugin()
    ]
};

var dir = fs.readdirSync(config.pathToPages);
dir.forEach(function (filename) {
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: `./src/html/pages/${filename}`,
            filename: `${filename}`
        })
    );
});

module.exports = config;