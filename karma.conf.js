const path = require('path');
const webpack = require('webpack');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [{ pattern: 'spec/**/*.spec.tsx', watched: false }],
    preprocessors: { 'spec/**/*.spec.tsx': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.tsx', '.ts', '.js'] },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env)
        })
      ],
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
          {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, 'app'),
            exclude: /node_modules/,
            enforce: 'post',
            use: '@jsdevtools/coverage-istanbul-loader'
          }
        ],
      },
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'text-summary' }
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
