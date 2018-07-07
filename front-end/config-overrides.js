const eslintFormatter = require('react-dev-utils/eslintFormatter');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config) {
  config = injectBabelPlugin('babel-plugin-styled-components', config);

  config.module.rules.push({
    test: /\.(js|jsx|mjs)$/,
    enforce: 'pre',
    use: [
      {
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),

        },
        loader: require.resolve('eslint-loader'),
      },
    ],
  });

  return config;
};
