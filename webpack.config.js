const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
   
    entry: { main: './src/index.js', main2: './src/va.js' }, 
    output: { path: path.resolve(__dirname+'/public' , 'dist'), filename: '[name].js' },
    
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
