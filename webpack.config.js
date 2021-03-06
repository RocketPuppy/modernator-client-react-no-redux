const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development',
        template: "index.html"
      })
    ],

    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loader: 'prettier-loader',
              // force this loader to run first if it's not first in loaders list
              enforce: 'pre',
              // avoid running prettier on all the files!
              // use it only on your source code and not on dependencies!
              exclude: /node_modules/,
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { enforce: 'pre', test: /\.tsx?$/, loader: "tslint-loader",
              options: {
                emitErrors: true,
                failOnHint: true,
                typeCheck: true,
                fix: true
              }
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devServer: {
      contentBase: "./dist",
      historyApiFallback: true
    }
};
