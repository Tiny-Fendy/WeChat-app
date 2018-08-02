const Controller = require('egg').Controller;

class IndexController extends Controller {
    methods() {
        return {
            login: 'get',
            logout: 'post',
            getUserInfo: 'get'
        }
    }

    // 登陆
    async login() {
        this.ctx.body = {
            errorCode: 10001,
            success: false,
            message: '登陆失败',
            data: null
        }
    }

    // 登出
    async logout() {
        const { request: { body }, cookies } = this.ctx;

        console.log(body);
        this.ctx.body = {
            success: true
        }
    }

    async getUserInfo(res, req) {
        const { cookies } = this.ctx;

        const userId = cookies.get('userId');

        this.ctx.body = {
            errorCode: 70000,
            message: '',
            success: true,
            data: {
                rows: []
            }
        }

    }
}

module.exports = IndexController;
