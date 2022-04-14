const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon')
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { database } = require('./keys');
//

//initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 3060);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views')),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


//Middleware
app.use(session({
    secret: 'mysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'css', 'images', 'Ring1.png')));
app.use(flash());


//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    next();
})


//Routes
app.use(require('./routes'));
app.use(require('./routes/list'));



//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log("Server on port ", app.get('port'));
});