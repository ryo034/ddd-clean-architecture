import terser from "@rollup/plugin-terser"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, loadEnv } from "vite"

type Mode = "development" | "production" | "analyze"

export default ({ mode }: { mode: Mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    build: {
      rollupOptions: {
        plugins: [
          mode === "analyze" &&
            visualizer({
              open: true,
              filename: "dist/stats.html",
              gzipSize: true,
              brotliSize: true
            })
        ],
        output: {
          // By splitting frequently updated code (for example, the application code you wrote yourself) and less frequently updated code (such as code from external libraries or frameworks), the browser can cache and reuse the less frequently updated code.
          manualChunks: {
            vendor: ["react", "react-router-dom", "react-dom"],
            libs: ['axios', 'i18next', 'class-variance-authority', 'clsx', 'immer', 'zustand', 'true-myth'],
          }
        }
      }
    },
    resolve: {
      alias: {
        "@/": `${__dirname}/src/`,
        "~/": `${__dirname}/src/`
      }
    },
    plugins: [
      react(),
      terser({
        compress: {
          drop_console: true
        }
      }),
      visualizer()
    ]
  })
}

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     terser({
//       compress: {
//         drop_console: true
//       }
//     }),
//     visualizer(),
//   ],
//   resolve: {
//     alias: {
//       "@/": `${__dirname}/src/`,
//       "~/": `${__dirname}/src/`
//     }
//   }
// })
