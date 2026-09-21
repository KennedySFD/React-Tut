/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: { styledComponents: true },
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
