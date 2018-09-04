
const { Controller } = require('egg');

class IndexController extends Controller {
    methods() {
        return {
            markTime: 'post',
            getTimeList: 'get'
        }
    }

    async markTime() {
        const { request: { body } } = this.ctx;

        this.ctx.body = {
            code: 10000,
            success: true,
            message: '记录成功'
        }
    }


    async getTimeList() {
        const { query } = this.ctx;

        this.ctx.body = {
            code: 10000,
            success: true,
            message: '',
            data: {
                list: []
            }
        }
    }
}

module.exports = IndexController;
