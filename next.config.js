const nextConfig = {
    experimental: {
      appDir: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(docx)$/,
        use: {
          loader: 'file-loader',
        },
      });
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  