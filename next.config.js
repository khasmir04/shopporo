const withLess = require('next-with-less');

module.exports = withLess({
  // optional
  env: {
    PUBLIC_URL: 'http://localhost:3000',
    BACKEND_URL: 'https://api.shopporo.ml',
    consumerKey: "ck_9f8fc54f84807c9f927975225178ffa345a79c1d",
    consumerSecret: "cs_0b77b434eb9fde3c54649bcc14cf1c3636dc3c70",
    sessionSecret: "5EBE2294ECD0E0F08EAB7690D2A6EE69",
  },
  // optional
  lessVarsFilePath: './styles/variables.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: true,
  // optional https://github.com/webpack-contrib/css-loader#object
  // cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config;
  },
});