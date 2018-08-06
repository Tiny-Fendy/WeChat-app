module.exports = {
    keys: 'WeChat',
    middleware: [],

    // 模板配置
    view: {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.ejs',
        mapping: {
            '.ejs': 'nunjucks',
        },
    },
};
