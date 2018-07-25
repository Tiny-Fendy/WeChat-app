module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.user.index);
    router.get('/api/getList', controller.user.getList);
    router.post('/api/setList', controller.user.setList);
};
