import path from 'path';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

import app from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default {
    input: 'src/index.js',
    output: {
        file: `./dist/${path.basename(app.main)}`,
        format: 'umd',
        name: 'Relax',
    },
    plugins: [
        eslint({
            throwOnError: true,
            throwOnWarning: true,
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        isProd && uglify(),
        filesize(),
    ],
};
