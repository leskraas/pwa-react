const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {
    const isEnvDevelopment = env === 'development';
    return {
        mode: isEnvDevelopment ? 'development' : 'production',
        entry: {
            app: './src/index.tsx',
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(css)$/i,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: 'file-loader',
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: 'public/manifest.json', to: '.' },
                    { from: 'public/images', to: '.' }
                ],
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
        output: {
            filename: '[name].bundle.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
    }
}



