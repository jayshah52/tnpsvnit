module.exports = {
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        proxy: {
            "^/api/v1/": {
                target: 'http://127.0.0.1:8100',
                changeOrigin: true,
                logLevel: "debug",
            },
        }
    },
}