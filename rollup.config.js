import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/wfc-app.js',
  output: {
    file: 'docs/assets/wfc-app.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    ...(process.env.NODE_ENV === 'production' ? [terser()] : []),
  ],
};
