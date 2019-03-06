const routes = require('./index');


module.exports = (app) => {
    app.use('/', routes);
    // app.use('/obituary', obs);
    // app.use('/users', users);
    // app.use('/auth', auth);
    return app;
};