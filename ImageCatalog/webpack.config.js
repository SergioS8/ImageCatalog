const path = require("path");
const webpack = require("webpack");
const { merge } = require('webpack-merge');

const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const contentDir = path.resolve(__dirname, "Frontend");
const jsDir = path.resolve(contentDir, "js");
const filesDir = path.resolve(contentDir, "files");

const env = process.env.NODE_ENV || "development";
const log = function (...str) {
    return console.log("WEBPACK: ", ...str);
};

log("Env is ", env);

const babelOptions = {
    babelrc: true,
    cacheDirectory: true
};

const commonExcludedPaths = [
    path.resolve("node_modules"),
    path.resolve("wwwroot")
];

const baseConfig = {
    mode: "development",
    entry: './Frontend/js/index.js',
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                include: [filesDir, path.resolve("node_modules")],
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: commonExcludedPaths,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(j|t)sx?$/,
                include: jsDir,
                exclude: commonExcludedPaths,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    },
                    "eslint-loader"
                ]
            },
            {
                test: /\.(svg|jpg|gif|ico)$/,
                include: [
                    filesDir,
                    path.resolve(__dirname, "node_modules/react-images-upload")
                ],
                use: 'file-loader?name=[name].[ext]&outputPath=../Frontend/files'
            }
        ]
    },
    optimization: {
        concatenateModules: false,
        splitChunks: {
            cacheGroups: {
                "default": {
                    minChunks: 2,
                    priority: -30,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(jsDir),
            path.resolve(contentDir)
        ],
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
            "@Styles": path.resolve(__dirname, 'Frontend/styles/'),
            "@Files": path.resolve(__dirname, 'Frontend/files/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jquery": "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default']
        }),
        new CopyWebpackPlugin([
            {
                from: "Frontend/files/**/*.*",
                to: ".."
            }
        ]),
        function () {
            this.plugin("done", function (stats) {
                if (__PROD__ && stats.compilation.errors && stats.compilation.errors.length) {
                    console.log(stats.compilation.errors);
                    throw new Error("webpack build failed.");
                }
            });
        }
    ]
};

const devConfigPatch = {
    output: {
        pathinfo: true
    },
    devtool: "cheap-module-source-map",

    plugins: [
        new WebpackBar(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true)
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                enabled: true,
                files: path.resolve(__dirname, "./.eslintrc.js")
            },
            typescript: {
                enabled: true,
                configFile: path.resolve(__dirname, "./tsconfig.json")
            },
            async: false,
            formatter: {
                type: "codeframe",
                options: {
                    highlightCode: true
                }
            }
        }),
    ]
};

const config = merge(baseConfig, devConfigPatch)

module.exports = config;
