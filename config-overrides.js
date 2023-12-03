// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.ejs$/,
    loader: 'ejs-loader',
  });

  return config;
};
