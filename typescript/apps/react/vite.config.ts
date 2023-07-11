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
          manualChunks: {
            vendor: ["react", "react-router-dom", "react-dom"]
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
