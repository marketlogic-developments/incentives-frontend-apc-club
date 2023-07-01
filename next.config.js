const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./styles/Base/_variables.scss";`,
  },

  images: {
    domains: ["images.ctfassets.net"],
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.html$/,
      loader: "html-loader",
    });
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  swcMinify: true,
  reactStrictMode: false,
  env: {
    BACKURL: "https://apc.mymarketlogic.net/api/v1",
    CLOUDINARY_CLOUD_NAME: "dechrcyu3",
  },
};
