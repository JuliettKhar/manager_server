const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/Main.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
         static: './dist',
        compress: true,
        port: 9000,
    },
    plugins: [
     new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
   ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};