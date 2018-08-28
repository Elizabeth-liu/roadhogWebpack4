/**
 * Created by wjt12933 on 2018/5/7.
 */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const theme = require("./src/theme");
const bodyParser = require("body-parser");

// console.log('主题变量\r\n', theme);

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    host: "0.0.0.0", // 主机地址
    port: 8008, // 端口号
    open: false,
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    stats: {
      children: false,
      chunks: false,
      assets: false,
      modules: false
    },
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    chunkFilename: "[name].async.js",
    library: "[name]_dll"
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      layouts: path.resolve(__dirname, "src/layouts/"),
      utils: path.resolve(__dirname, "src/utils/"),
      services: path.resolve(__dirname, "src/services/"),
      routes: path.resolve(__dirname, "src/routes/"),
      models: path.resolve(__dirname, "src/models/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [],
        loader: "babel-loader?cacheDirectory"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]_[local]-[hash:base64:5]"
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ],
        exclude: /src/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  externals: {
    jquery: "jQuery"
  },
  node: {
    fs: "empty",
    module: "empty"
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.(css|less)/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.ejs"), // 模板
      filename: "index.html",
      hash: true // 防止缓存
    }),
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "public")
      }
    ]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./manifest.json")
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: require.resolve('./public/lib/vendors.dll.js'),
    //   includeSourcemap: false,
    //   hash: true,
    // }),
    new webpack.HotModuleReplacementPlugin(), // 调用webpack的热更新插件
    new ManifestPlugin()
    // new BundleAnalyzerPlugin(),
    // new HardSourceWebpackPlugin(),
  ]
};
