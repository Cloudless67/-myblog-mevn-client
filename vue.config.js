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
};
