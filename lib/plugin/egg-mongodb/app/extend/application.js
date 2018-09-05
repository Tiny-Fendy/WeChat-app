const DB = Symbol('db');
const { MongoClient } = require('mongodb');

module.exports = {
    get db() {
        if (!this[DB]) {
            const config = this.config.mongodb;
            const { clients: { hostname, port } } = config;

            this[DB] = () => MongoClient.connect(`mongodb://${hostname}:${port}`, {useNewUrlParser: true}).then(client => {
                const WeChat = client.db('wechat');
                return WeChat.collection('users');
            });
        }

        return this[DB];
    }
};
