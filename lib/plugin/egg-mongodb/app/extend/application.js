const DB = Symbol('db');
const { MongoClient } = require('mongodb');

module.exports = {
    get db() {
        if (!this[DB]) {
            const config = this.config.mongodb;
            const { clients: { hostname, port, dbName, collection } } = config;

            this[DB] = () => MongoClient.connect(`mongodb://${hostname}:${port}`, { useNewUrlParser: true }).then(client => {
                const WeChat = client.db(dbName);
                return WeChat.collection(collection);
            });
        }

        return this[DB];
    }
};
