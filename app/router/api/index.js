/**
 * 路由自动注册，省去手动挂载路由
 * api的地址规则为 /api/${filename}/${function name}
 * */

module.exports = app => {
    const { router, controller } = app;

    for (const [filename, file] of Object.entries(controller.api)) {
        if (typeof file.methods === 'function') {
            // 一个hack的方法，防止egg内部的this.app.config.controller报错
            file.methods.call({app: {config: {}}}).then(methods => {
                for (const [key, method] of Object.entries(methods)) {
                    router[method](`/api/${filename}/${key}`, file[key]);
                }
            });
        } else {
            console.log('ERROR: 请正确设置methods');
        }
    }
};
