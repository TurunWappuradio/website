const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BROADCAST_MODE': JSON.stringify(process.env.BROADCAST_MODE),
        'METADATA_SERVER': JSON.stringify(process.env.METADATA_SERVER),
        'SHOUTBOX_SOURCE': JSON.stringify(process.env.SHOUTBOX_SOURCE)
      }
    })
  ]
};
