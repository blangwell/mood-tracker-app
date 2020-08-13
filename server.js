require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');

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
app.use(passport.initialize())
app.use(passport.session())
// this goes under the passport middleware
// flash temporary messages to the user (error messages)
app.use(flash());


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
