import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  publicDir: isSsrBuild ? false : 'public',
  build: isSsrBuild
    ? { outDir: 'dist-ssr', emptyOutDir: true, copyPublicDir: false }
    : {
        outDir: 'dist',
        emptyOutDir: true,
        manifest: true,
        modulePreload: { polyfill: false },
        cssCodeSplit: false,
        rollupOptions: {
          input: 'src/entry-client.jsx',
          output: {
            // React in its own long-cached chunk, shared by every page
            manualChunks: (id) => (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id) ? 'react' : undefined),
          },
        },
      },
}));
