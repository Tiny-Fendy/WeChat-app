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
    async login(res, req) {
        this.ctx.body = {
            errorCode: 10001,
            success: false,
            message: '登陆失败',
            data: null
        }
    }

    // 登出
    async logout() {

    }

    async getUserInfo(res, req) {
        const { cookies } = this.ctx;

        const userId = cookies.get('userId');

    }
}

module.exports = IndexController;
