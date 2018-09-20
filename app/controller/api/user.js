const Controller = require('egg').Controller;

class UserController extends Controller {
    methods() {
        return {
            login: 'post',
            getUserInfo: 'get'
        }
    }

    // 登陆
    async login() {
        const { request: { body } } = this.ctx;
        const { code, userInfo } = body;

        try {
            // 获取AppID
            const { openid, session_key } = await this.ctx.service.user.getAppId(code);

            // 存入session
            this.ctx.session.session_key = session_key;
            this.ctx.session.openid = openid;

            // 查询数据库，若无该账号，则初始化值
            const db = await this.app.db();
            const user = await db.findOne({ userId: openid });
            if (!user) {
                await db.insertOne({ userId: openid, userInfo, list: [] });
            }

            this.ctx.body = {
                errorCode: 70000,
                success: true,
                message: '登陆成功'
            }
        } catch (e) {
            this.ctx.body = {
                errorCode: 70001,
                success: false,
                message: `登陆失败: ${e}`
            }
        }
    }

    async getUserInfo(res, req) {
        const userInfo = await this.ctx.user.getInfo();

        this.ctx.body = {
            errorCode: 70000,
            message: '',
            success: true,
            data: userInfo
        }
    }
}

module.exports = UserController;
