/**
 * 中间件:打印接口调用日志
 * */

const { MongoClient } = require('mongodb');

module.exports = options => {
  const url = `mongodb://${this.app.config.env === 'prod' ? '172.19.136.42' : 'localhost'}:27017`;

  MongoClient.connect(url, (err, client) => {



    client.close();
  });

  return async (ctx, next) => {

    await next();
  }
};
