const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname+'/public' , 'dist'),
      filename: 'main.js',
    }, 
    
    
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.css$/, use: 'css-loader' },
        { test: /\.ts$/, use: 'ts-loader' },
        {
            test: /\.(png|svg|jpe?g|gif)$/,
            include: /images/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                  publicPath: 'images/'
                }
              }
            ]
          },
          
    ],
  },
  plugins: [
    new VueLoaderPlugin()
]
 
};
