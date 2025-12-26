const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 3002,
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
            name: 'content',
            filename: 'remoteEntry.js',
            exposes: {
                './Content': './src/Content',
            },
            shared: ['react', 'react-dom'],
        }),
    ],
};