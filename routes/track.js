const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const axios = require('axios')

router.get('/', (req, res) => {
    const currentUser = db.user.findOne({
        where: {id: 1}
    }).then(user => {
        user.getMoods()
        .then(moods => {
            console.log(moods);
            moods.forEach(m => {
                console.log(`\nDATE: ${m.date}`)
                console.log(`elevated mood level: ${m.elevated}`)
                console.log(`depression level: ${m.depressed}`)
                console.log(`irritability level: ${m.irritable}`)
                console.log(`anxiety level: ${m.anxious}`)
                console.log(`${m.sleep} hours of sleep`)
    
            })
        })
    })
    res.render('track/index')

})


router.get('/new', (req, res) => {
    
    res.render('track/new')
})


module.exports = router;