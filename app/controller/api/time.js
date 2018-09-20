const moment = require('moment');
const { Controller } = require('egg');

class IndexController extends Controller {
    methods() {
        return {
            record: 'post',
            getDay: 'get',
            getList: 'get'
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
        const m = moment(`${body.date} ${body.time}`, 'YYYY/MM/DD HH:mm:ss');
        const time = m.format('HH:mm:ss');
        const date = m.format('YYYY-MM-DD');
        const six = new Date(`${date} 06:00`);
        const isBeforeDawn = new Date(m.format()) < six;
        const db = await this.app.db();

        // 判断今天的数据是否已经存在
        const result = await db.findOne({ userId: openid, 'list.date': date });

        if (result) {
            await db.updateOne({ userId: openid, 'list.date': date }, {
                $set: {
                    'list.$.time': time,
                    'list.$.isBeforeDawn': isBeforeDawn
                }
            });
        } else {
            await db.updateOne({ userId: openid }, { $push: { list: { date, time, isBeforeDawn } } });
        }

        this.ctx.body = {
            errorCode: 10000,
            success: true,
            message: '记录成功'
        }
    }

    // 获取指定天的信息
    async getDay() {
        const data = await this.ctx.user.getInfo();
        const date = moment().format('YYYY-MM-DD');

        this.ctx.body = {
            errorCode: 10000,
            success: true,
            message: '',
            data: data.list.find(item => item.date === date)
        };
    }

    async getList() {
        const { list } = await this.ctx.user.getInfo();

        this.ctx.body = {
            errorCode: 10000,
            success: true,
            message: '',
            data: { list }
        }
    }
}

module.exports = IndexController;
