import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  exclude: ['src/stories/**', 'src/**/__tests__/**', '**/*.test.*', '**/*.stories.*'],
});
