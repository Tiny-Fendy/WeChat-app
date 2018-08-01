/**
 * 用户注册
 * */

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index () {
        await this.ctx.render('signUp');
    }
}

module.exports = IndexController;
