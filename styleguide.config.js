module.exports = {
    title: 'Open Web Shell Guide',
    components: 'src/docs/**/[A-Z]*.js',
    webpackConfig: {
        module: {
            rules: [
                // Babel loader, will use your project’s babel.config.js
                {
                    test: /\.js$|\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                // Other loaders that are needed for your components
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        }
    }
}