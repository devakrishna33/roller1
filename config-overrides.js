const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const { addLessLoader } = require("customize-cra");

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env);

  config = addLessLoader({
    javascriptEnabled: true
  })(config, env);

  config.resolve.alias = {
    ...config.resolve.alias,
    "react-dom": "@hot-loader/react-dom"
  };
  return config;
};
