const Controller = require('egg').Controller;

class IndexController extends Controller {

    // 登陆
    async login(res, req) {

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
