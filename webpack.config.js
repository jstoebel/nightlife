let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');


process.traceDeprecation = true; // when something is deprecated, tell me where.

module.exports = {

  entry: {
    js: './src/client.jsx',
    css: './src/css/main.scss',
  },
  output: {
    filename: '[name]-bundle-[hash:6].js',
    publicPath: 'build',
    path: __dirname + '/public/build',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // {
      //   test: /\.(png|jpg|)$/,
      //   loader: 'url-loader?limit=200000'
      // }
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 4,
                },
                pngquant: {
                  quality: '75-90',
                  speed: 3,
                },
              },
            }
          ]
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: './public/build/[name]/main.css', disable: false, allChunks: true}),
    new HtmlWebpackPlugin({
      filename: `${__dirname}/public/build/index.html`,
      template: `${__dirname}/src/index.html`,
    }),
  ],
};
