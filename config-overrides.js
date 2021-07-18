const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

/* config-overrides.js */
module.exports = function override(config, env) {
  // alias
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": resolve("src"),
    "@components": resolve("src/components"),
    "@view": resolve("src/views"),
    "@utils": resolve("src/utils"),
  };
  config.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];
  return config;
};
