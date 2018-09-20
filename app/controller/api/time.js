const moment = require('moment');
const { Controller } = require('egg');

class IndexController extends Controller {
    methods() {
        return {
            record: 'post',
            getList: 'get',
            getToday: 'get'
        }
    }

    /**
     * 记录时间
     * time: YYYY-MM-DD HH:mm
     * */
    async record() {
        const { request: { body } } = this.ctx;
        const { openid } = this.ctx.session;

        // 判断时间是否为次日凌晨
        const now = moment(body.date, 'YYYY/MM/DD');
        const time = moment().format('HH:mm:ss');
        const date = moment(body.date, 'YYYY/MM/DD').format('YYYY-MM-DD');
        const six = new Date(`${date} 06:00`);
        const isBeforeDawn = Date.now() < six;
        const db = await this.app.db();

        console.log(date, openid);

        // 判断今天的数据是否已经存在
        const result = await db.update({ userId: openid, 'list.date':  date }, {
            list: {
                date,
                time,
                isBeforeDawn
            }
        });

        const userInfo = await db.findOne({ userId: openid }, { list: 1 , '_id': 0 });

        this.ctx.body = {
            errorCode: 10000,
            success: true,
            message: '记录成功',
            data: userInfo
        }
    }

    async getToday() {
        const { openid } = this.ctx.session;
        const db = await this.app.db();

        const data = await db.find({ userId: openid }, { projection: { '_id': false } });
        const date = moment().format('YYYY-MM-DD');

        this.ctx.body = {
            errorCode: 10000,
            success: true,
            message: '',
            data: data.list.filter(item => item.date === date)
        };
    }

    async getList() {
        const { query } = this.ctx;

        this.ctx.body = {
            errorCode: 10000,
            success: true,
            message: '',
            data: {
                list: []
            }
        }
    }
}

module.exports = IndexController;
