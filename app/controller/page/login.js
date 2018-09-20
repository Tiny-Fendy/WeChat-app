/**
 * 登陆页
 * */

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        const { request: { header } } = this.ctx;
        const reg = new RegExp(`^${this.config.allowRefer}`);

        // 校验是否是来自微信的请求
        if (reg.test(header.referer)) {
            await this.ctx.render('login');
        } else {
            this.ctx.body = {
                errorCode: 10001,
                success: false,
                message: '未知来源'
            }
        }
    }
}

module.exports = IndexController;
