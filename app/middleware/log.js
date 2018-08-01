/**
 * 中间件:打印接口调用日志
 * */

module.exports = options => async function (ctx, next) {
    const { request, query, body } = ctx;
    const { method, url } = request;

    console.log('================');
    console.log(`METHOD: ${method}`);
    console.log(`URL: ${url}`);
    console.log(method === 'GET' ? `query: ${JSON.stringify(query)}` : `body: ${JSON.stringify(body)}`);
    console.log(`options: ${JSON.stringify(options)}`);

    await next();
};
