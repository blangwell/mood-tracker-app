const express = require('express');
const router = express.Router();
const db = require('../models');
// const methodOverride = require('method-override');

router.get('/edit', (req, res) => {
    res.render('edit', {user: req.user});
  })

router.put('/edit', (req, res) => {
    db.user.update({email: req.body.email}, {where: {email: req.user.email},})
    .then(() => {
        res.render('profile', {user: req.user})
    })
})
  
router.delete('/edit', (req, res) => {
    db.user.destroy({
        where: {id: req.user.id}
    }).then(response => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router