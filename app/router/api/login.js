module.exports = app => {
    const { router, controller } = app;

    for (const [filename, file] of Object.entries(controller.api)) {
        for (const [api, content] of Object.entries(file)) {
            router.get(`/api/${api}`, content);
        }
    }
};
