

require('dotenv').config()
let HtmlWebPackPlugin=require('html-webpack-plugin');
let path = require('path');
const {DefinePlugin } = require('webpack');

module.exports={
    entry:[
        'regenerator-runtime/runtime',
        './src/index.js',
      ],
    output:{
        filename:"bundle.[hash].js",
        path:path.resolve(__dirname,"dist"),
        publicPath: '/'
        
    },
    plugins:[new HtmlWebPackPlugin({template:"./src/index.html"}),
             new DefinePlugin({"process.env": JSON.stringify(process.env)})
            ],
    resolve:{
        modules:[__dirname,"src","node_modules"],
        extensions:["*",".js",".jsx",".tsx",".ts"]
    },
    module:{

        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                loader:require.resolve('babel-loader')
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
      }
    

}