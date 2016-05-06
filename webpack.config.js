var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var fs = require('fs');

var env = process.env.NODE_ENV || '';

var webpackConfig = {
    entry: {},
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [],
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html-loader',
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
            },
        }, {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader',
            ],
        }, {
            test: /\.(otf|eot|svg|ttf|woff|woff2)\??.*$/,
            loader: 'file-loader',
            query: {
                name: 'font/[name].[hash].[ext]',
            },
        }],
    },
};

fs.readdirSync(path.join(__dirname, 'src', 'js')).map(function (filename) {
    if (/\.js$/.test(filename)) {
        webpackConfig.entry['js/' + filename.split('.')[0]] = path.join(__dirname, 'src', 'js', filename);
    }
});

fs.readdirSync(path.join(__dirname, 'src', 'js', 'dev')).map(function (filename) {
    if (/\.js$/.test(filename)) {
        webpackConfig.entry['js/dev/__' + filename.split('.')[0] + '__'] = path.join(__dirname, 'src', 'js', 'dev', filename);
    }
});

fs.readdirSync(path.join(__dirname, 'src', 'html')).map(function (filename) {
    if (/\.html$/.test(filename)) {
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.ejs'),
            filename: path.join(__dirname, 'dist', filename),
            inject: false,
            body: fs.readFileSync(path.join(__dirname, 'src', 'html', filename)),
            script: env.indexOf('production') > -1 ? '<script src="/js/' + filename.split('.')[0] + '.js"></script>' : '',
            dev: env.indexOf('development') > -1 ?'<script src="/js/dev/__' + filename.split('.')[0] + '__.js"></script>' : '',
        }));
    }
});

module.exports = webpackConfig;