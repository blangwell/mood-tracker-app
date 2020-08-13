const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

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
      res.redirect('/');
    } else {
      // email already exists
      console.log(' Email already exists ya doofus\n==========');
      res.redirect('/auth/signup')
    }
  })
  .catch(err => {
    console.log(`======!ERROR!======\n${err}`);
    res.redirect('/auth/signup');
  })
})

module.exports = router;
