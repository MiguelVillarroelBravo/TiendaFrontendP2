const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [{ pattern: 'spec/**/*.spec.tsx', watched: false }],
    preprocessors: { 'spec/**/*.spec.tsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.tsx', '.ts', '.js'] },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: path.resolve(__dirname, 'tsconfig.karma.json'),
              },
            },
          },
        ],
      },
    },
    reporters: ['spec'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};