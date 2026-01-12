const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageInfo = require('./package.json')
module.exports = {
    mode: 'development',
    entry: './src/Content.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devServer: {
        port: 3002,
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
            {
                test: /\.css$/i,
                // Ensure you include the directory where your source CSS is located
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
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
            name: 'content',
            filename: 'remoteEntry.js',
            exposes: {                
                './Content': './src/Content',
            },
            shared: {
                ...packageInfo.dependencies,
                'react': {
                    singleton: true,
                    requiredVersion: packageInfo.dependencies['react']
                }, 'react-dom': {
                    singleton: true,
                    requiredVersion: packageInfo.dependencies['react-dom']
                },
                // 'jotai': {
                //     singleton: true,
                //     requiredVersion: packageInfo.dependencies['jotai']
                // }
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};