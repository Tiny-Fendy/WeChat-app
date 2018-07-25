module.exports = options => async function (ctx, next) {
    const { request, query, body } = ctx;
    const { method, url, header } = request;

    console.log(method, url, method === 'GET' ? query : body);
    console.log('options', options);

    await next();
};
