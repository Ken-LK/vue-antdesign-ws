// vue.config.js
module.exports = {
    outputDir: 'docker/nginx/dist',
    devServer: {
        port: 8008,
        proxy: {
            '/api': {
                target: 'http://172.21.34.104:9999',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 需要rewrite的,
                }
            }
        }
    },
}
