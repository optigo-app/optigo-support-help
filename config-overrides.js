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

  // Webpack 5 fallbacks for client bundles (e.g. ag-psd / node modules)
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: false,
    fs: false,
    path: false,
    stream: false,
    crypto: false,
  };

  // Webpack 5 strict ESM resolution fix for packages importing without extension (e.g. three loaders)
  config.module = config.module || { rules: [] };
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  // Explicit aliases for three.js extensionless imports in @eternalheart/react-file-preview
  config.resolve.alias = {
    ...config.resolve.alias,
    'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls.js',
    'three/examples/jsm/loaders/STLLoader': 'three/examples/jsm/loaders/STLLoader.js',
    'three/examples/jsm/loaders/OBJLoader': 'three/examples/jsm/loaders/OBJLoader.js',
    'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js',
  };

  return config;
});
