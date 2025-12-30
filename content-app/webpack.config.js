const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    entry: './src/Content.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".js", ".jsx"]
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
            name: 'content',
            filename: 'remoteEntry.js',
            exposes: {
                './Store': './src/store.js',
                './Content': './src/Content',                
            },
            shared: ['react', 'react-dom'],
        }),
    ],
};