module.exports = {
    keys: 'WeChat',
    middleware: ['log'],

    // 模板配置
    view: {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.ejs',
        mapping: {
            '.ejs': 'nunjucks',
        },
    },

    mongodb: {
        clients: {
            hostname: 'localhost',
            port: '27017'
        }
    }
};
