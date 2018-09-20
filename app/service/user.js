const { Service } = require('egg');

module.exports = class UserService extends Service {
    // 链接微信服务器，获取appid
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

    // 获取用户信息
    async getInfo(filter = {}) {
        const { openid } = this.ctx.session;
        const db = await this.app.db();

        return db.find(Object.assign({ userId: openid }, filter), { projection: { '_id': false } });
    }
};
