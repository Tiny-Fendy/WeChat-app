const { Service } = require('egg');
let flag = 0;

module.exports = class UserService extends Service {
    async getAppId(code) {
        const { config } = this.app;

        return this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
            method: 'GET',
            data: {
                appid: config.appid,
                secret: config.secret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).then(res => JSON.parse(res.data.toString()));
    }
};
