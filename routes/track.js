const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const axios = require('axios')
let dateArray = [];

router.get('/', (req, res) => {
    const currentUser = db.user.findOne({
        where: {id: 1}
    }).then(user => {
        user.getMoods()
        .then(moods => {
            // console.log(moods);
            // moods.forEach(m => {
            //     console.log(`\nDATE: ${m.date}`)
            //     console.log(`elevated mood level: ${m.elevated}`)
            //     console.log(`depression level: ${m.depressed}`)
            //     console.log(`irritability level: ${m.irritable}`)
            //     console.log(`anxiety level: ${m.anxious}`)
            //     console.log(`${m.sleep} hours of sleep`)
    
            // })
            // log the last 7 entries of db
            for (let i=7; i>0; i--) {
                if (moods[i] && dateArray.length<7) {
                    // console.log(`${moods[i].date}\n Depression level: ${moods[i].depressed}`);
                    dateArray.push(moods[i].date)
                } else { // if there is no mood data 
                    console.log(`no data available!`);
                }
            }
        })
        .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})

    // console.log(dateArray)
    res.render('track/index', {dates: dateArray})

})


router.get('/new', (req, res) => {
    
    res.render('track/new')
})


module.exports = router;