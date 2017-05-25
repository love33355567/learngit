var path = require('path')
var webpack = require('webpack')
const rootPath = path.resolve( __dirname )
const srcPath = path.join(rootPath, 'src')
const entry = path.join( srcPath, 'addressList.js' )
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
     entry
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
       // test: /\.js$/,
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.json$/,
        loaders: [ 'json' ],
        exclude: /node_modules/,
        include: __dirname
      },
      { test: path.join(__dirname, 'es6'), loader: 'babel-loader' }
    ]
  }
}
