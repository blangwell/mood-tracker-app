const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const axios = require('axios')
let dateArray = [];

class ChartData {
    constructor(column) {
        this.column = column;
    }
}

router.get('/', (req, res) => {
    const currentUser = db.user.findOne({
        where: {id: 1}
    }).then(user => {
        user.getMoods()
        .then(moods => {
            // log the last 7 entries of db
            for (let i=7; i>0; i--) {
                if (moods[i] && dateArray.length<7) {
                    // console.log(`${moods[i].date}\n Depression level: ${moods[i].depressed}`);
                    dateArray.push(moods[i].date)
                } else { // if there is no mood data 
                    console.log(`no data available!`);
                }
            }
            res.render('track/index', {dates: dateArray, moods: moods})
        })
        .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})

    // console.log(dateArray)

})


router.get('/new', (req, res) => {
    
    res.render('track/new')
})


module.exports = router;