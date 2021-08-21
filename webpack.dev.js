const path = require("path");

const fs = require("fs");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./docs",
    // https: true,
    // host: '0.0.0.0',
    // port: 443,
    // public: 'ec2-3-128-50-114.us-east-2.compute.amazonaws.com',
    // key: fs.readFileSync('/home/ubuntu/keys/https.key'),
    // cert: fs.readFileSync('/home/ubuntu/keys/https.crt'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "fake-service-worker.js",
          to: path.resolve(__dirname, "docs") + "/service-worker.js",
          toType: "file"
        }
      ]
    })
  ]
});
