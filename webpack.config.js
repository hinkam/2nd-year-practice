module.exports = {
    entry: {
      index: "./src/app/index.js",
      image: "./src/app/image.js"
    },
    mode: "development",
    output: {
        filename: "./js/[name].js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader"
            }
          },
        ]
    }
}
