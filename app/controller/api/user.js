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
        this.ctx.body = {
            errorCode: 10000,
            success: false,
            message: `登陆成功`,
            data: null
        }
    }

    // 登出
    async logout({ res, req }) {
        const { request: { body }, cookies } = this.ctx;

        console.log('body', res.body, req.body);

        this.ctx.body = {
            success: true
        }
    }

    async getUserInfo(res, req) {
        const { cookies } = this.ctx;
        const sessionId = cookies.get('sessionId');

        if (sessionId) {
            this.ctx.body = {
                errorCode: 70000,
                message: '',
                success: true,
                data: {
                    userId: '12031023903',
                    username: 'kk'
                }
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
