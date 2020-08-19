const express = require('express');
const db = require('../models');
const router = express.Router();
const moment = require('moment') 
const today = moment().format('YYYY-MM-DD')

router.get('/', (req, res) => {
    let dateArray = [];
    let moodObjectArray = [];

    // get last seven days
    for (let i = 0; i<=7; i++) {
        let day = moment().subtract(i, 'day').format('YYYY-MM-DD')
        dateArray.push(day)
    }
        db.user.findOne({
            // TODO change to req.user.id (must be logged in ya dummy)
            where: {id: req.user.id},
            include: [db.mood]
        })
        .then(user => {
            // loop through moods associated w user
            // if (mood.date) === dateArray[i] {foundMoods.push(mood)}
            // loop thru foundMoods and dateArray
            user.moods.forEach(m => {
                // M IS ITERATING SUCCESSFULLY
                foundMoods = {}
                console.log(m)
                dateArray.forEach(d => { // PROBLEM LOGIC
                    // moodObjectArray.indexOf(m) == -1
                    // !m in moodObjectArray
                    if (d == m.date) {
                        // THIS PUSHES THE SAME DATA OVER AND OVER
                        foundMoods.date = d;
                        foundMoods.elevated = m.elevated;
                        foundMoods.depressed = m.depressed;
                        foundMoods.irritable = m.irritable;
                        foundMoods.anxious = m.anxious;
                        foundMoods.sleep = m.sleep;
                        moodObjectArray.push(foundMoods)
                    } 
                })
            })
            // console.log(moodObjectArray)
            res.render('track/index', {dates: dateArray, moods: moodObjectArray})
        })
        .catch(err => {console.log(err)})
})


router.get('/new', (req, res) => {
    
    res.render('track/new', {today})
})

router.get('/show', (req, res) => {
    console.log(req.body);
    res.render('track/show')
})
 
router.post('/show', (req, res) => {
    let updatePost = false;
    db.user.findOne({
        where: {id: req.user.id},
        include: [db.mood]
    }).then(user => {
        user.getMoods().then(moods => {
            moods.forEach(m => {
                if (m.date == req.body.date) {
                    updatePost = true;
                    m.update({
                        elevated: req.body.elevated, 
                        depressed: req.body.depressed,
                        irritable: req.body.irritable,
                        anxious: req.body.anxious,
                        sleep: req.body.sleep
                    }).then(() => {
                        if (!updatePost) {
                            user.createMood({
                                date: req.body.date,
                                elevated: req.body.elevated, 
                                depressed: req.body.depressed,
                                irritable: req.body.irritable,
                                anxious: req.body.anxious,
                                sleep: req.body.sleep
                
                            })
                        }
                    })
                    .catch(err => {console.log(err)})
                } 
            })
        })
        .catch(err => {console.log(err)})
    })
    res.redirect('/track/show')
})
module.exports = router;

// ==========THE GRAVEYARD========== 

//router.post('/show', (req, res) => {
// db.user.findOne({
//     where: {id: req.user.id},
//     include: [db.mood]
// }).then(user => {
    
//     console.log(`U MOOD - ${user.moods}`)

//     user.createMood({
//         date: req.body.date,
//         elevated: req.body.elevated, 
//         depressed: req.body.depressed,
//         irritable: req.body.irritable,
//         anxious: req.body.anxious,
//         sleep: req.body.sleep

//     })
// })
// db.user.findOne({
//     where: {id: 1},
//     include: [db.mood]
// }).then(user => {
    
//     console.log(`U MOOD - ${user.moods}`)
//     user.getMoods().then(moods => {
//         console.log(moods)
//     })
    // user.mood.findOrCreate({
    //     where: {date: req.body.date},
    //     defaults: {
    //         date: req.body.date,
    //         elevated: req.body.elevated, 
    //         depressed: req.body.depressed,
    //         irritable: req.body.irritable,
    //         anxious: req.body.anxious,
    //         sleep: req.body.sleep

    //     }
    // }) 
// })

// const getData = (metric, array) => {
    //     moods.forEach(m => {
        //         if (m.metric !== null) {
            //              array.push(m.metric) 
//          } else { 
//              array.push(0)
//          } 
//      }) 
//  } 



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


// ADD A NEW USER TO THE DATABASE
// HERE GOES THE LOGIC FOR UPDATING AS WELL

// {
//     date: req.body.date,
//     elevated: req.body.elevated, 
//     depressed: req.body.depressed,
//     irritable: req.body.irritable,
//     anxious: req.body.anxious,
//     sleep: req.body.sleep

// }

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

// router.post('/show', (req, res) => {
    //     db.user.findOne({
    //         where: {id: 1},
    //         include: [db.mood]
    //     }).then(user => {
    //         user.findOrCreate({
    //             where: {
    //                 date: req.body.date
    //             }
    //         }).then(([mood, created]) => {
    //             if (!created) {
    //                 mood.update({
    //                     values: {
    //                         date: req.body.date,
    //                         elevated: req.body.elevated, 
    //                         depressed: req.body.depressed,
    //                         irritable: req.body.irritable,
    //                         anxious: req.body.anxious,
    //                         sleep: req.body.sleep
    
    //                     }
    //                 })
    //             } else {
    //                 mood.update({
    //                     values: {
    //                         elevated: req.body.elevated, 
    //                         depressed: req.body.depressed,
    //                         irritable: req.body.irritable,
    //                         anxious: req.body.anxious,
    //                         sleep: req.body.sleep
    //                     }
    //                 })
    //             }
    //         })
    
    //     })
    //     // console.log(req.body);
    //     res.redirect('/track/show')
    // })
    