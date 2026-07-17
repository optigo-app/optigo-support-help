const { override ,addBabelPlugin } = require("customize-cra");
const packageJson = require("./package.json");

module.exports = override((config) => {
  
  const version = packageJson.version.replace(/\./g, "_");

  // JS versioning → works already
  config.output.filename = `static/js/[name].[contenthash].js?v=${version}`;
  config.output.chunkFilename = `static/js/[name].[contenthash].chunk.js?v=${version}`;

  // CSS versioning → this is the part you are missing
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === "MiniCssExtractPlugin") {
      plugin.options.filename = `static/css/[name].[contenthash].css?v=${version}`;
      plugin.options.chunkFilename = `static/css/[name].[contenthash].chunk.css?v=${version}`;
    }
  });

  return config;
});
