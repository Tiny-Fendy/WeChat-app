module.exports = app => {
    const { router, controller } = app;

    for (const [filename, content] of Object.entries(controller.page)) {
        router.get(`/${filename}`, content.index);
    }

    router.get('/', controller.page.home.index);
};
