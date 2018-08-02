/**
 * 中间件:打印接口调用日志
 * */

module.exports = options => async (ctx, next) => {
    const { request, query } = ctx;
    const { method, url, body } = request;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    console.log('================');
    console.log(`Time: ${date} ${time}`);
    console.log(`URL: ${url}`);
    console.log(`METHOD: ${method}`);
    console.log(method === 'GET' ? `query: ${JSON.stringify(query)}` : `body: ${JSON.stringify(body)}`);
    console.log(`options: ${JSON.stringify(options)}`);

    await next();
};
