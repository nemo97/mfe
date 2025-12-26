const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                headerApp: 'header@http://localhost:3001/remoteEntry.js',
                contentApp: 'content@http://localhost:3002/remoteEntry.js',
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};