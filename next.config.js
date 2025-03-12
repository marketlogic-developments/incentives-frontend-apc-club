const path = require("path");

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./styles/Base/_variables.scss";`,
  },

  images: {
    domains: ["images.ctfassets.net","res.cloudinary.com"],
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
  typescript: {
    ignoreBuildErrors: true, // Ignorar errores de TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores de ESLint
  },
  trailingSlash: true,
  swcMinify: false,
  reactStrictMode: false,
};
