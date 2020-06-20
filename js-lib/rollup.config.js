// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/main.ts',
  output: {
    file: 'dist/browser.js',
    format: 'umd',
    name: 'wv-linewise-js-lib'
  },
  plugins: [
    typescript()
  ]
}
