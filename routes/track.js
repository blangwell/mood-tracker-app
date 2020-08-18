const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const axios = require('axios')
const moment = require('moment') 
const today = moment().format('MM-DD-YYYY')

class ChartData {
    constructor(column) {
        this.column = column;
    }
}

router.get('/', (req, res) => {
    let dateArray = [];
    // list last seven days
    for (let i = 0; i<=7; i++) {
        let day = moment().subtract(i, 'day').format('MM-DD-YYYY')
        dateArray.push(day)
    }
    const currentUser = db.user.findOne({
        where: {id: 1}
    }).then(user => {
        user.getMoods()
        .then(moods => {
            // just grab all the dates and push them to the array
            // moods.forEach(m => {
            //     dateArray.push(m.date)
            // })
            console.log(`BACKEND DATE ARRAY ${dateArray}`)
            res.render('track/index', {dates: dateArray, moods: moods})
        })
        .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})    
})


router.get('/new', (req, res) => {
    
    res.render('track/new', {today})
})

router.post('/'), (req, res) => {
    db.mood.findOrCreate({
        where: {
            date: req.body.date
        }
    })
}


module.exports = router;


// Create an object 
// let moodData = {
//     date: mood.date,
//     elevated: mood.elevated,
//     depressed: mood.depressed,
//     irritable: mood.irritable,
//     anxious: mood.anxious,
//     sleep: mood.sleep
// }



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