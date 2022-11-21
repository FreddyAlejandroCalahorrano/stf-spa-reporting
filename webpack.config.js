const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "auto",
    uniqueName: "mf_reporting_app",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mf_reporting_app",
      library: { type: "var", name: "mf_reporting_app" },
      filename: "remoteEntry.js",
      exposes: {
        MFModule:
          "src/app/mf.module",
      },
      shared: {
        "@angular/core": { eager: true, singleton: true, requiredVersion: '~12.2.0' },
        "@angular/common": { eager: true, singleton: true, requiredVersion: '~12.2.0' },
        "@angular/router": { eager: true, singleton: true, requiredVersion: '~12.2.0' }
      },
    }),
  ],
};
