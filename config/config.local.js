exports.security = {
    domainWhiteList:['.servicewechat.com'],
};

exports.allowRefer = 'https://servicewechat.com';
7
exports.mongodb = {
    clients: {
        hostname: 'localhost',
        port: '27017',
        collection: 'users',
        dbName: 'wechat'
    }
};
