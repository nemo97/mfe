const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageInfo = require('./package.json')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const webpack = require('webpack'); // You might need this reference for DefinePlugin

module.exports = {
    mode: 'development',
    // entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devServer: {
        port: 3001,
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
        // Add the plugin to the plugins array
        gitRevisionPlugin,
        // Use DefinePlugin to make the info available in your application code
        new webpack.DefinePlugin({
            'process.env.VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'process.env.COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'process.env.BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
            COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
        }),
        new ModuleFederationPlugin({
            name: 'header',
            filename: 'remoteEntry.js',
            exposes: {
                './Header': './src/Header',
                './Footer': './src/Footer',
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
                'jotai': {
                    singleton: true,
                    requiredVersion: packageInfo.dependencies['jotai']
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};