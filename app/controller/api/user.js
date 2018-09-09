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
        const { config } = this.app;
        const { request: { body }, cookies } = this.ctx;
        const { code } = body;

        // 获取AppID
        const result = await this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
            method: 'GET',
            data: {
                appid: config.appid,
                secret: config.secret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).then(res => JSON.parse(res.data.toString()));

        // 存入session
        this.ctx.session.session_key = result.session_key;
        this.ctx.session.openid = result.openid;

        // 查询数据库，若无该账号，则初始化值
        const db = await this.app.db();
        const userInfo = await db.find({ usrId: result.openid });

        if (!userInfo) {
            await db.insert({ usrId: result.openid, list: [] })
        }


        this.ctx.body = {
            errorCode: 70000,
            success: true,
            message: `登陆成功`,
            data: null
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
