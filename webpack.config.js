const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//function returns webpack config object when called. Advantageous b/c you can call function with arguments
module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');  //extract css styles into their own file

    return {

        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //source-map takes longer to build, but is better for production
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true   //tells dev server that we are routing via client-side code, it should return index.html for all 404 routes
        }
    }
}

//Old config setup
// module.exports = {

//     entry: './src/app.js',
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [{
//             test: /\.js/,
//             loader: 'babel-loader',
//             exclude: /node_modules/,
//         }, {
//             test: /\.s?css$/,
//             use: [
//                 'style-loader',
//                 'css-loader',
//                 'sass-loader'
//             ]
//         }]
//     },
//     devtool: 'cheap-module-eval-source-map', 
//     devServer: {
//         contentBase: path.join(__dirname, 'public'),
//         historyApiFallback: true   //tells dev server that we are routing via client-side code, it should return index.html for all 404 routes
//     }
// }