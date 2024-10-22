const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const external = require("rollup-plugin-peer-deps-external");
const postcss = require("rollup-plugin-postcss");
const { dts } = require("rollup-plugin-dts");
const esbuild = require("rollup-plugin-esbuild").default;
const json = require("@rollup/plugin-json");

const packageJson = require("./package.json");

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = [
  {
    input: "src/index.ts",
    watch: true,
    /**
     * @type {import('rollup').OutputOptions[]}
     */
    output: [
      {
        dir: "dist/es",
        format: "es",
        sourcemap: true,
        esModule: true,
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named"
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named"
      }
    ],
    external: [...Object.keys(packageJson.peerDependencies)],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      json(),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: true,
        target: "es2017",
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
        tsconfig: "tsconfig.prod.json",
        loaders: {
          ".json": "json",
          ".js": "jsx"
        }
      }),
      postcss({
        extract: true,
        minimize: true
      })
    ]
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es"
    },
    plugins: [dts()]
  }
];
