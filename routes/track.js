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
            // for (let i=moods.length -1; i>moods.length-8; i--) {
            //     console.log(`BACKEND DATES ${moods[i].date}`)
            //     if (moods[i].date && dateArray.length<7) {
            //         // console.log(`${moods[i].date}\n Depression level: ${moods[i].depressed}`);
            //         dateArray.push(moods[i].date)
            //         // console.log(moods)
            //     } else { // if there is no mood data 
            //         console.log(`no data available!`);
            //         break
            //     }
            // }
            moods.forEach(m => {
                if(m.date) dateArray.push(m.date)
            })
            console.log(`BACKEND DATE ARRAY ${dateArray}`)
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