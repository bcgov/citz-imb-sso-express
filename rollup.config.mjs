import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'build',
        format: 'commonjs',
        sourcemap: true,
      },
    ],
    external: ['cookie-parser', 'cors', 'express'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', outputToFilesystem: true }),
    ],
  },
];
