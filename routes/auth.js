const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('../config/ppConfig');


router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});


// POST ROUTES
// to get data back, make a post route
router.post('/signup', (req, res) => {
  console.log(req.body)
  db.user.findOrCreate({
    where: { email: req.body.email  },
      defaults: { 
        name: req.body.name,
        password: req.body.password
      }
    
  })
  //findOrCreate .then() takes an array. created returns boolean
  .then(([user, created]) => { 
    if (created) {
      // if created, success and redirect to home
      console.log(`${user.name} was created`);
      // authenticate them
      // flash message
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created'
      })(req, res);
      // before passport authenticate
    } else {
      // email already exists
      console.log(' Email already exists ya doofus\n==========');
      // FLASH MESSAGE
      // flash() needs two params, event and message
      req.flash('error', 'An account with that email already exists!')
      res.redirect('/auth/signup')
    }
  })
  .catch(err => {
    console.log(`======!ERROR!======\n${err}`);
    req.flash('error', `Something went wrong!\n${err}`);
    res.redirect('/auth/signup');
  })
})

// FLASH MESSAGE
// when a user logs in, this is where we authenticate them
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back!',
  failureFlash: 'Password or Email is Incorrect! Give it another shot.'
}));

router.post('/login', (req, res) => {

})

// LOGOUT
router.get('/logout', (req, res) => {
  req.logOut();
  // FLASH MESSAGE  
  req.flash('success', 'Logged out Successfully! See you soon!')
  res.redirect('/');
})

module.exports = router;
