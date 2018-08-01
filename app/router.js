module.exports = app => {
    require('./router/page')(app);
    require('./router/api/login')(app);
};
