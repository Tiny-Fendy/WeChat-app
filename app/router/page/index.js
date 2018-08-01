module.exports = app => {
    const { router, controller } = app;

    // console.log(controller.page);

    router.get('/home', controller.page.home.index);
    router.get('/login', controller.page.login.index);
};
