module.exports = {
    outputDir: 'vueInit',
    //build输出目录

    assetsDir: 'assets',
    //静态资源目录（js, css, img）

    lintOnSave: false,
    //是否开启eslint

    devServer: {
        disableHostCheck: true,

        open: true,
        //是否自动弹出浏览器页面

        host: "127.0.0.1",

        // public:'192.168.1.43:8080',
        port: '8080',
        https: false,

        hotOnly: false,


        proxy: {

            '/api': {
                target: 'http://192.168.1.43:8013', //A服务器地址
                changeOrigin: true, //改变源路劲
                pathRewrite: {
                    '^/api': '/'
                }
            },

        }
    }
}