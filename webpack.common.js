const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./components/dnd-base-routing-view.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "img/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "fonts/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/classes/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/newClasses/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "data/spells/*",
          to: ".",
          toType: "dir"
        },
        {
          from: "index.html",
          to: "index.html",
          toType: "file"
        },
        {
          from: "img/favicon.ico",
          to: "favicon.ico"
        },
        {
          from: path.resolve(__dirname, "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"),
          to: "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"
        },
        {
          from: path.resolve(__dirname, "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js.map"),
          to: "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js.map"
        }
      ]
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "docs"),
    publicPath: "/5etools/"
  }
};
