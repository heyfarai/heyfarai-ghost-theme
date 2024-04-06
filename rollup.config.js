import { defineConfig } from 'rollup'
// A Rollup plugin which locates modules using the Node resolution algorithm

// CSS
// Enable the PostCSS preprocessor
// import postcss from 'rollup-plugin-postcss';
// Use @import to include other CSS files
// import atImport from 'postcss-import';
// Use the latest CSS features in your Rollup bundle
// import postcssPresetEnv from 'postcss-preset-env';

// Development: Enables a livereload server that watches for changes to CSS, JS, and Handlbars files
import { resolve } from 'path'
import livereload from 'rollup-plugin-livereload'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

// Rollup configuration
export default defineConfig({
  input: 'assets/js/index.js',
  output: {
    dir: 'assets/built',
    sourcemap: true,
    format: 'esm',
  },
  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      output: 'assets/built/css/main.css',
      failOnError: true,
      fileName: 'main.css',
      watch: './assets/css/modules',
      outputStyle: 'compressed',
    }),

    process.env.BUILD !== 'production' &&
      livereload({
        watch: resolve('.'),
        extraExts: ['hbs'],
        exclusions: [resolve('node_modules')],
      }),
  ],
})
