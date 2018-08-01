/**
 * 登陆页
 * */

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        await this.ctx.render('login');
    }
}

module.exports = IndexController;
