const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css',{publicPath:{font:'./public'}});


module.exports = {
    entry: './public/assets/js/App.ts',
    entry: path.resolve(__dirname, './public/assets/css/console.less'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.less']
    },

    module: {
        rules: [
            // TYPESCRIPT LOADER
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },

            {
                test: /\.woff(2)?$/,
                loader: "file-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }



        ]
    },


    devServer: {
        contentBase: './public',
        publicPath: '/dist'
    },


    plugins: [
        extractLESS,
    ]


};
