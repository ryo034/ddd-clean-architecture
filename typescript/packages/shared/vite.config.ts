import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import terser from '@rollup/plugin-terser'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      emptyOutDir: false,
      sourcemap: process.env.VITE_MODE !== "production",
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "shared",
        fileName: (format) => `shared.${format}.js`,
      },
    },
    plugins: [
      terser({
        compress: {
          drop_console: true
        }
      })
    ]
  });
}