const Controller = require('egg').Controller;

class IndexController extends Controller {
    methods() {
        return {
            login: 'post',
            logout: 'post',
            getUserInfo: 'get'
        }
    }

    // 登陆
    async login(req) {
        const { cookies, request, service } = this.ctx;

        console.log(request.body);

        this.ctx.body = {
            errorCode: 10001,
            success: false,
            message: `登陆失败`,
            data: null
        }
    }

    // 登出
    async logout() {
        const { request: { body }, cookies } = this.ctx;

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

module.exports = IndexController;
