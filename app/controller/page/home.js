/**
 * 主页
 * */

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        const { cookies } = this.ctx;
        const cookie = cookies.get('user');

        if (!cookie) {
            await this.ctx.redirect('/login');
        } else {
            await this.ctx.render('home', {
                title: 'Hello World!'
            });
        }
    }
}

module.exports = IndexController;
