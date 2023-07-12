import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser'//压缩代码
import strip from '@rollup/plugin-strip'; //删除log
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript';
import RollupClear from 'rollup-plugin-clear'//打包前删除
import cleanup from 'rollup-plugin-cleanup';//删除注释
import externals from "rollup-plugin-node-externals";//声明第三方依赖
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'//css 加前缀
import cssnano from "cssnano";//压缩css

export default {
  input: 'src/modules/index.ts',
  output: [{
    file: './lib/index.min.js',
    format: 'es',
    plugins: [terser()],
    name: 'svelte-reader',
  }],
  plugins: [
    RollupClear({
      targets: ['lib'],
      watch: true,
    }),
    externals({ devDeps: false }),
    strip({
      labels: ['unittest']
    }),
    resolve(),
    svelte({
      preprocess: autoPreprocess({}),
      emitCss: false,
      onwarn: (warning, handler) => {
        if (warning.code.startsWith('a11y-')) return
        handler(warning)
      },
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules']
    }),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled'
    }),
    // postcss({
    //   plugins: [autoprefixer(), cssnano()]
    // }),
    cleanup()
  ],
  external: ['svelte', 'Epub'],
};