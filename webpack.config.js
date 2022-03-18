const path = require("path");
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  plugins: [
    new CKEditorWebpackPlugin( {
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en'
    } )
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: [ 'raw-loader' ]
      },
      {
        test: /src[/\\].+\.css$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    injectType: 'singletonStyleTag'
                }
            },
            'css-loader'
        ]
      },
      {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          use: [
              {
                  loader: 'style-loader',
                  options: {
                      injectType: 'singletonStyleTag',
                      attributes: {
                          'data-cke': true
                      }
                  }
              },
              'css-loader',
              {
                  loader: 'postcss-loader',
                  options: {
                      postcssOptions: styles.getPostCssConfig( {
                          themeImporter: {
                              themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                          },
                          minify: true
                      } )
                  }
              }
          ]
      }
    ]
  },
  devServer: {
    static: [
        { directory: path.join(__dirname, 'public') },
        { directory: path.join(__dirname, 'build'), publicPath: '/build' }
    ],
    port: 3000
  }
};
