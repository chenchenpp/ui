"use strict";
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { VueLoaderPlugin } = require("vue-loader");
// 分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 合并css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 压缩文件
const TerserPlugin = require("terser-webpack-plugin");
// 清空构建文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 整理入口
const Components = fs.readdirSync("./src/components");
const dirs = Components.filter((v) => {
  return fs.statSync(path.resolve("./src/components", v)).isDirectory();
});
const entries = {};
dirs.forEach((v) => {
  entries[v] = `./src/components/${v}/index.js`;
});

const externals = [{ vue: "vue" }, nodeExternals()];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: "production",
  entry: resolve('../src/index.js'),
  output: {
    path: path.resolve(process.cwd(), "./lib/"),
    filename: `index.js`,
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
  },
  externals: externals,
  resolve: {
    extensions: [".js", ".vue", ".json", ".scss"],
    alias: {
      "@": resolve("../src"),
    },
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // 使用 MiniCssExtractPlugin.loader 作为 sass-loader 的前置 loader
            scss: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
        },
      },
      {
        test: /\.css$/,
        use: "css-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|svg|ttf|eot)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:5].[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "../fonts/",
              outputPath: "/fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
};
