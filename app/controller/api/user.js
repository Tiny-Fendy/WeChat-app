const Controller = require('egg').Controller;

class UserController extends Controller {
    methods() {
        return {
            login: 'post',
            logout: 'post',
            getUserInfo: 'get'
        }
    }

    // 登陆
    async login() {
        const { request: { body } } = this.ctx;
        const { code, userInfo } = body;

        // 获取AppID
        const result = await this.ctx.service.user.getAppId(code);

        // 存入session
        this.ctx.session.session_key = result.session_key;
        this.ctx.session.openid = result.openid;

        // 查询数据库，若无该账号，则初始化值
        const db = await this.app.db();
        const user = await db.findOne({ userId: result.openid }, { projection: { '_id': false } });

        if (!user) {
            await db.insert({ userId: result.openid, userInfo, list: [] });
        }

        this.ctx.body = {
            errorCode: 70000,
            success: true,
            message: `登陆成功`,
            data: user
        }
    }

    // 登出
    async logout({ res, req }) {
        this.ctx.body = {
            success: true
        }
    }

    async getUserInfo(res, req) {
        const { cookies } = this.ctx;
        const sessionId = cookies.get('sessionId');
        const db = await this.app.db();
        const list = await db.find({}, { projection: { '_id': false } }).toArray();

        if (sessionId) {
            this.ctx.body = {
                errorCode: 70000,
                message: '',
                success: true,
                data: { list }
            }
        } else {
            this.ctx.body = {
                errorCode: 70001,
                message: '用户未登录',
                success: false,
                data: null
            }
        }
    }
}

module.exports = UserController;
