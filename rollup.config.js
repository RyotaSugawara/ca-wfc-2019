import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/wfc-app.js',
  output: {
    file: 'docs/assets/wfc-app.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve()
  ]
}
