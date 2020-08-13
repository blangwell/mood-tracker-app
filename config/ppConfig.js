const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../models')

/* what passport does is serialize your info making it easier to login. 
- convert the user based on the id
*/

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

// passport "deserializeuser" is going to take the id and look it up
//in the database
passport.deserializeUser((id, cb) => {

    db.user.findByPk(id)
    .then(user => {
        cb(null,user)
    }).catch(cb);
})

// its gonna look for email and password in the database
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            cb(null, false)
        } else {
            cb(null, user)
        }
    })
    .catch(cb)
}))

module.exports = passport;