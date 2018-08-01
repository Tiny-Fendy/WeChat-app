/**
 * 主页
 * */

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        const { cookies } = this.ctx;
        const cookie = cookies.get('user');

        if (!cookie) {
            cookies.set('user', 'JSKFS8F7SF87S8F7S8F7', {
                httpOnly: false,
                maxAge: 20 * 1000
            });
        }
        this.ctx.session.user = 's8f9us89fus9fu8sdf8s';
        await this.ctx.render('home', {
            title: 'Hello World!'
        });
    }
}

module.exports = IndexController;
