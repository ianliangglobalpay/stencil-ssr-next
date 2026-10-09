import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'stencil-lib',
  hashFileNames: false,
  sourceMap: true,
  buildDist: true,
  outputTargets: [
    reactOutputTarget({
      outDir: '../stencil-lib-react/src',
      hydrateModule: '@example/stencil-lib/hydrate',
      clientModule: '@example/stencil-lib-react',
      serializeShadowRoot: {
        default: 'declarative-shadow-dom',
      },
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'dist-hydrate-script',
      dir: 'hydrate',
    },
  ],
};
