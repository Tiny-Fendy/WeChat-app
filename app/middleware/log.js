/**
 * 中间件:打印接口调用日志
 * */

module.exports = options => async function (ctx, next) {
    const { request, query, body } = ctx;
    const { method, url } = request;

    console.log(method, url, method === 'GET' ? query : body, `options ${options}`);

    await next();
};
