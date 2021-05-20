const path = require('path');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

module.exports = {
    devServer: {
        proxy: 'http://localhost:3000',
    },
    pages: {
        index: {
            entry: 'src/main.ts',
            filename: 'index.html',
            title: 'Cloudless의 블로그',
        },
    },
    outputDir: '../server/dist/public',
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
        },
    },
    configureWebpack: {
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
                only: ['bundle'],
            }),
        ],
    },
};
