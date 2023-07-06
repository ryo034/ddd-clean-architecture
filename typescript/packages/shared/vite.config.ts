import path from 'path'
import {defineConfig, loadEnv} from 'vite'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

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
  });
}