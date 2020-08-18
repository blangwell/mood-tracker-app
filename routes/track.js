const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const axios = require('axios')
const moment = require('moment') 
const today = moment().format('YYYY-MM-DD')
const flatpickr = require('flatpickr')

router.get('/', (req, res) => {
    let dateArray = [];
    let moodObjectArray = [];
    foundMoods = {
        date: today,
        elevated: 0,
        depressed: 0,
        irritable: 0,
        anxious: 0,
        sleep: 0
    }

    // list last seven days
    for (let i = 0; i<=7; i++) {
        let day = moment().subtract(i, 'day').format('YYYY-MM-DD')
        dateArray.push(day)
    }
        db.user.findOne({
            // req.user.id (must be logged in ya dummy)
            where: {id: 1},
            include: [db.mood]
        })
        .then(user => {
            // loop through moods associated w user
            // if (mood.date) === dateArray[i] {foundMoods.push(mood)}
            // create found moods array DONE
            // loop thru foundMoods and dateArray
            dateArray.forEach(d => {
                user.moods.forEach(m => {
                    if (m.date == d) {
                        // THIS PUSHES THE SAME DATA OVER AND OVER
                        console.log(`HERE IS MOOD : ${m}\n HERE IS DATE : ${d}`)
                        foundMoods.elevated = m.elevated;
                        foundMoods.depressed = m.depressed;
                        foundMoods.irritable = m.irritable;
                        foundMoods.anxious = m.anxious;
                        foundMoods.sleep = m.sleep;
                        moodObjectArray.push(foundMoods)
                    } else {

                    }
                })
            })
                res.render('track/index', {dates: dateArray, moods: foundMoods})
        })

    // find a user include the moods
    // date array is just for checking
    // found moods for those dates
    // const currentUser = db.user.findOne({
    //     where: {id: 1}
    // }).then(user => {
    //     user.getMoods()
    //     .then(moods => {
    //         // just grab all the dates and push them to the array
    //         // moods.forEach(m => {
    //         //     dateArray.push(m.date)
    //         // })
    //         console.log(`BACKEND DATE ARRAY ${dateArray}`)
    //     })
    //     .catch(err => {console.log(err)})
    // })
    // .catch(err => {console.log(err)})    
})


router.get('/new', (req, res) => {
    
    res.render('track/new', {today})
})

router.get('/show', (req, res) => {
    // db.mood.findOrCreate({
    //     where: {
    //         date: req.body.date
    //     }
    // })
    console.log(req.body);
    res.render('track/show')
})

// ADD A NEW USER TO THE DATABASE
// HERE GOES THE LOGIC FOR UPDATING AS WELL
router.post('/show', (req, res) => {
    db.user.findOne({
        where: {
            id: 1
        }
    }).then(u => {
        u.createMood({
            date: req.body.date,
            elevated: req.body.elevated, 
            depressed: req.body.depressed,
            irritable: req.body.irritable,
            anxious: req.body.anxious,
            sleep: req.body.sleep

        })
    })
    // console.log(req.body);
    res.redirect('/track/show')
})

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