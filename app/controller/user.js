const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index(res, req) {
        this.ctx.body = 'Hello World!';
    }

    async getList(res, req) {
        this.ctx.body = {
            code: 70001,
            message: '成功',
            data: {
                rows: [1 ,2 ,3]
            }
        }
    }

    async setList() {
        this.ctx.body = {
            code: 70001,
            message: '设置成功',
            data: null
        }
    }
}

module.exports = IndexController;
