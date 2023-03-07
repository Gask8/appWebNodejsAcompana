require('dotenv').config({path:__dirname+'/config/.env'}); 
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sessions = require('express-session');
const flash = require('connect-flash');
const { Client,LocalAuth  } = require('whatsapp-web.js');

const app = express();
const router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(sessions({secret: 'secretkey', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Flash Notification Handler
app.use((req,res,next)=>{
	res.locals.wrong = req.flash('wrong');
	res.locals.succes = req.flash('succes');
	res.locals.del = req.flash('del');
	next();
})

//add the router
// app.use('/', router);
var index = require('./routes/index');
app.use('/', index);
require("./routes/celula.routes.js")(app);
require("./routes/voluntario.routes.js")(app);
require("./routes/doliente.routes.js")(app);
require("./routes/escucha.routes.js")(app);
require("./routes/horario.routes.js")(app);
require("./routes/aporte.routes.js")(app);
require("./routes/canalizado.routes.js")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Listening Port
app.listen(process.env.PORT || 3000, () => console.log('Escuchando en el puerto '+process.env.PORT));
module.exports = app;
