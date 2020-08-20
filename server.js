require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');

// require the authorization middleware (goes at top of script)
const isLoggedIn = require('./middleware/isLoggedIn')

app.set('view engine', 'ejs');

//middleware extends to other parts of the program
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// secret: what we are giving the client to use our site/ SESSION COOKIE
// resave: save the session even if it's modified, make this false
// saveUninitialized if we have a new session, we'll save it by setting saveUninitialized to true

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}))

// initialize passport (express middleware for authentication)
// and run session as middleware
app.use(passport.initialize());
app.use(passport.session());

// this goes after the passport middleware
// flash temporary messages to the user (error messages)
app.use(flash());

// middleware to have our alerts partial accessible for every view
app.use((req, res, next) => {
  // before every route, we will attach our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  // now that the middleware is run, go to the next thing
  // similar to .then(). 
  next();
})

app.get('/', (req, res) => {
  console.log(res.locals.alerts);
  res.render('index', { alert: res.locals.alerts });
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {user: req.user});
});

app.use('/auth', require('./routes/auth'));
app.use('/track', require('./routes/track'))
app.use('/help', require('./routes/help'))

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
