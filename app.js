'use strict';
//#region required includes
const debug = require('debug'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    routes = require('./app/routes/loader'),
    helmet = require('helmet'),
    dotenv = require('dotenv').config();
//#endregion

//#region express and view inits
const app = express();
const hbs = exphbs.create({
    defaultLayout: 'layout',
    extname: '.hbs'
});
app.locals.apiPath = process.env.API_PATH;

//#region view engine setup 
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//#endregion

//#endregion

//#region app.uses
/* uncomment after placing your favicon in /public */
app.use(helmet());
app.use(favicon(__dirname + '/public/img/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { index: false, extensions: ['json'] }));
routes(app);
//#endregion

//#region error handling middleware
/* catch 404 and forward to error handler */
app.use((req, res, next) => {
    return res.status(404).redirect('https://theobituaryapp.com');
});

/* error handlers

 development error handler
 will print stacktrace

*/
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/* production error handler
	no stacktraces leaked to user
	*/
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//#endregion


//#region app start
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'),
    () => {
        debug(`Express server listening on port ${server.address().port}`);
    });
//#endregion