/* eslint-env node */
const isProduction = process.env.NODE_ENV === 'production';
// https://github.com/vercel/next.js/blob/master/packages/next/next-server/server/config.ts
const nextConfig = {
  webpack: config => {
    const oneOfRule = config.module.rules.find(rule => rule.oneOf);

    // Next 12 has multiple TS loaders, and we need to update all of them.
    const tsRules = oneOfRule.oneOf.filter(rule => rule.test && rule.test.toString().includes('tsx|ts'));

    tsRules.forEach(rule => {
      // eslint-disable-next-line no-param-reassign
      rule.include = undefined;
    });

    return config;
  },
  compress: true,
  generateEtags: true,
  pageExtensions: ['tsx', 'mdx', 'ts'],
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized : true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },{
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  
  // Condicional para producción
  ...(isProduction && {
    basePath: '/ResumeProject',  // Nombre del repositorio en GitHub
    assetPrefix: '/ResumeProject', // Necesario para servir los archivos estáticos correctamente
    output: 'export',  // Genera los archivos estáticos para despliegue
  }),
};

module.exports = nextConfig;
