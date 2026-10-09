import path from 'node:path';
import { fileURLToPath } from 'node:url';
import stencilSSR from '@stencil/ssr/next';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(dirname, '../..'),
  allowedDevOrigins: ['*.csb.app'],
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        // just a nicety - don't ignore our local packages during dev
        ignored: [
          "**/node_modules/**",
          "!**/node_modules/@example/stencil-lib-react/**",
          "!**/node_modules/@example/stencil-lib/**",
        ],
      };
    }

    return config;
  },
};

// Compiler SSR (strategy 'nextjs'). Remove this wrapper and import from
// '@example/stencil-lib-react/next' to compare with Runtime SSR.
export default stencilSSR({
  from: '@example/stencil-lib-react',
  module: import('@example/stencil-lib-react'),
  hydrateModule: import('@example/stencil-lib/hydrate'),
  serializeShadowRoot: { default: 'declarative-shadow-dom' },
})(nextConfig);
