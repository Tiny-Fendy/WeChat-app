const DB = Symbol('db');
const { MongoClient } = require('mongodb');
const url = `mongodb://${this.app.config.env === 'prod' ? '172.19.136.42' : 'localhost'}:27017`;

module.exports = {
    get db() {
        if (!this[DB]) {
            console.log(this.config);
            this[DB] = MongoClient.connect(url).then(client => {
                const wechat = client.db('wechat');
                return wechat.collection('users');
            }).catch(err => {
                console.error(err);
            });
        }

        return this[DB];
    }
};
