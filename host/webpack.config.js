const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'dist'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {                        
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
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