const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const webpack = require("webpack"); // only add this if you don't have yet
require("dotenv").config({ path: "./.env" });

const envPlugin = new webpack.DefinePlugin({
  "process.env": JSON.stringify(process.env),
});

module.exports = {
  // entry: "./src/client/app/main.tsx",
  entry: "./src/client/app/App.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [htmlPlugin, envPlugin],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  //remove warning related to size exceeds 244kb
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
