/**
 * 校验是否存在openid
 * */

module.exports = () => async (ctx, next) => {
    const { openid } = ctx.session;
    // 白名单
    const whiteList = [
        '/login',
        '/api/user/login'
    ];
    let { url } = ctx.request;

    url = url.includes('?') ? url.match(/[^\s]+(?=\?)/)[0] : url;

    if (whiteList.includes(url) || openid) {
        await next();
    } else {
        console.warn('无法获取openid');
        ctx.body = {
            errorCode: 10003,
            success: false,
            message: '未知用户'
        }
    }
};
