module.exports = {
    keys: 'WeChat',
    appid: 'wx91c6a5578cd9fc38',
    secret: 'a9882115756af1e1182a217e03fac632',
    middleware: ['log', 'checkOpenid'],

    // 模板配置
    view: {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.ejs',
        mapping: {
            '.ejs': 'nunjucks',
        },
    },

    session: {
        key: 'wechat_sleep',
    }
};
