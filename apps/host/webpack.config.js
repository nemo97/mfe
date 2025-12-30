const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
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
                test: /\.tsx?$/, // All files with a .ts or .tsx extension will be handled by ts-loader
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ["@babel/preset-env", "@babel/preset-react"]
            //         }
            //     },
            // },
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