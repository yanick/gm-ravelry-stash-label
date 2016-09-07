var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        "./src/main.js"
    ],
    resolve: {
        root: [ path.resolve(__dirname, 'src' )]
    },
    output: {
        path: 'dist',
        publicPath: '/',
        filename: "main.js"
    },
    module: {
        loaders: [
             {
            test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.css$/, loader: "style!css" },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [ 'babel'], // 'babel-loader' is also a legal name to reference
    }
        ]
    }
};


