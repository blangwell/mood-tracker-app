const express = require('express');
const db = require('../models');
const router = express.Router();
const moment = require('moment');
let today = moment().format('YYYY-MM-DD')

router.get('/', (req, res) => {
    let dateArray = [];
    let moodObjectArray = [];

        db.user.findOne({
            where: {id: req.user.id},
            include: [db.mood]
        })
        .then(user => {
            user.moods.forEach(m => {
                dateArray.push(m.date)
                moodObjectArray.push(m)
            })
            const compare = (a,b) => {
                let comparison = 0;
                if (a.date < b.date) {
                    comparison = 1
                } else if (a.date > b.date) {
                    comparison= -1;
                }
                return comparison
            }
            const compareDates = (a,b) => {
                let comparison = 0;
                if (a < b) {
                    comparison = 1
                } else if (a > b) {
                    comparison= -1;
                }
                return comparison
            }

            moodObjectArray.sort(compare)
            dateArray.sort(compareDates)
            moodObjectArray = moodObjectArray.slice(0, 7)
            dateArray = dateArray.slice(0, 7)
            console.log(' MOOD OBJECT ARRAY : ', moodObjectArray)
            console.log(' DATE ARRAY : ', dateArray)
            res.render('track/index', {dates: dateArray, moods: moodObjectArray})
  
        })
        .catch(err => {console.log(err)})
})


router.get('/new', (req, res) => {
    
    res.render('track/new', {today})
})



router.post('/show', (req, res) => {
    console.log(req.body)
    db.user.findOne({
        where: {id: req.user.id},
        include: [db.mood]
    })
    .then(user => {
        let newMood = {
            date: req.body.date,
            elevated: req.body.elevated,
            depressed: req.body.depressed,
            irritable: req.body.irritable,
            anxious: req.body.anxious,
            sleep: req.body.sleep
        }

        // FILTER RETURNS BOOLEAN
        let filteredMoods = user.moods.filter(m => {
            return m.date == req.body.date
        })

        console.log('FILTERED MOOD LENGTH : ' , filteredMoods.length)
        if (filteredMoods.length > 0) {
            filteredMoods[0].update(newMood)
            .then(updated => {
                console.log(' ARRAY NOT EMPTY, UPDATING.... ', updated)
                res.redirect('/track')
            })
            .catch(err => {console.log(err)})

        } else {
            console.log('THIS IS THE NEW MOOD : ', newMood)
            user.createMood({ 
                date: req.body.date,
                elevated: req.body.elevated,
                depressed: req.body.depressed,
                irritable: req.body.irritable,
                anxious: req.body.anxious,
                sleep: req.body.sleep
            })
            .then(relationInfo => {
                (' ARRAY EMPTY, CREATING ....', relationInfo)
                res.redirect('/track')
                
            })
            .catch(err => {console.log(err)})
        }
        // res.redirect('/track')
    })
    .catch(err => {console.log(err)})
})
module.exports = router;


                    // if (m.date in dateArray) {
                    //     foundMoods.date = d;
                    //     foundMoods.elevated = m.elevated;
                    //     foundMoods.depressed = m.depressed;
                    //     foundMoods.irritable = m.irritable;
                    //     foundMoods.anxious = m.anxious;
                    //     foundMoods.sleep = m.sleep;
                    //     moodObjectArray.push(foundMoods)
                    // } else {
                    //     foundMoods.date = d;
                    //     foundMoods.elevated = 0;
                    //     foundMoods.depressed = 0;
                    //     foundMoods.irritable = 0;
                    //     foundMoods.anxious = 0;
                    //     foundMoods.sleep = 0;
                    //     moodObjectArray.push(foundMoods)
                    // }

            // console.log(moodQueue)


                // dateArray.forEach(d => { // PROBLEM LOGIC
                //     if (m.date in dateArray) {
                //         // make key/value d : {foundMoods.date....} ?
                //         foundMoods.date = d;
                //         foundMoods.elevated = m.elevated;
                //         foundMoods.depressed = m.depressed;
                //         foundMoods.irritable = m.irritable;
                //         foundMoods.anxious = m.anxious;
                //         foundMoods.sleep = m.sleep;
                //         moodObjectArray.push(foundMoods)
                //     }  else if () {
                //         foundMoods.date = d;
                //         foundMoods.elevated = 0;
                //         foundMoods.depressed = 0;
                //         foundMoods.irritable = 0;
                //         foundMoods.anxious = 0;
                //         foundMoods.sleep = 0;
                //         moodObjectArray.push(foundMoods)
                //     }
                //     console.log(moodObjectArray)
                // })


        // console.log('hitting the user : ', user.dataValues.moods[0].usersMoods)
        // let joinTable = user.datavalues.moods[2].usersMoods
        // db.mood.findOrCreate({
        //     where: {}
        // })


        // })
        // console.log(user.moods)
        // user.moods.forEach(m => {
        //     if (m.date == req.body.date) {

        //     }
        // })
        // if (req.body.date == user.moods.date) {}
        // if (req.body.date == user.moods.date) {
        //     user.createMood({
        //         date: req.body.date,
        //         elevated: req.body.elevated,
        //         depressed: req.body.depressed,
        //         irritable: req.body.irritable,
        //         anxious: req.body.anxious,
        //         sleep: req.body.sleep
        //     })
        // }



// router.post('/show', (req, res) => {
//     db.user.findOne({
//         where: {id: req.user.id},
//         include: [db.mood]
//     })
//     .then(user => {
//         console.log('hitting the user : ', user)
//         user.getMoods().then(moods => {
//             moods.forEach(m => {   
//                 // ORIGINAL CODE COMMENTED OUT ABOVE GRAVEYARD
//                     if (m.date == req.body.date) {
//                         db.mood.update({
//                             elevated: req.body.elevated, 
//                             depressed: req.body.depressed,
//                             irritable: req.body.irritable,
//                             anxious: req.body.anxious,
//                             sleep: req.body.sleep
//                         }, {
//                             where: {date: req.body.date}
//                         })
//                         .then(()=> {
//                             res.redirect('/track') 
//                         })
//                         .catch(err => {
//                             console.log(err)
//                         })
                        
//                     } else  {
//                         user.createMood({
//                             date: req.body.date,
//                             elevated: req.body.elevated, 
//                             depressed: req.body.depressed,
//                             irritable: req.body.irritable,
//                             anxious: req.body.anxious,
//                             sleep: req.body.sleep
//                         })
//                         .then(()=> {
//                             res.redirect('/track') 
//                         })
//                         .catch(err => {
//                             console.log(err)
//                         })
//                     } 
//             //     if (m.date({ where: { date: req.body.date}})) {
//             //         console.log('TRUE')
//             //     } else { console.log('FALSE')}
//             let dateArray = [];
//             let moodObjectArray = [];

//             for (let i = 0; i<=7; i++) {
//                 let day = moment().subtract(i, 'day').format('YYYY-MM-DD')
//                 dateArray.push(day)
//             }

//             dateArray.forEach(d => {
//                 user.moods.findCreateFind({
//                     where: {date: d},
//                     defaults: {
//                         date: d,
//                         elevated: req.body.elevated,
//                         depressed: req.body.depressed,
//                         irritable: req.body.irritable,
//                         anxious: req.body.anxious,
//                         sleep: req.body.sleep
//                     }
//                 })
//                 .then(([mood, created]) => {
//                     console.log(mood, created)
//                 })
//             })
            
//         })
//         // .catch(err => {console.log(err)})
//     })
    
    
    //     user.moods.forEach(m => {  
    //         users.moods.findOrCreate({
    //             where: {date: m.date},
    //             defaults: {
    //                 date: m.date,
    //                 elevated: req.body.elevated, 
    //                 depressed: req.body.depressed,
    //                 irritable: req.body.irritable,
    //                 anxious: req.body.anxious,
    //                 sleep: req.body.sleep
    //             }
    //         }).then(([mood, created]) => {
    //             console.log(mood)
    //             console.log(`CREATED: ${created}`)
    //         })

    //     // })
    // })

//     moods.forEach(m => {
//         if (m.date == req.body.date) {
//             // updatePost = true;
//             m.update({
//                 elevated: req.body.elevated, 
//                 depressed: req.body.depressed,
//                 irritable: req.body.irritable,
//                 anxious: req.body.anxious,
//                 sleep: req.body.sleep
//             }).then(() => {
//                 if (!updatePost) {
//                     user.createMood({
//                         date: req.body.date,
//                         elevated: req.body.elevated, 
//                         depressed: req.body.depressed,
//                         irritable: req.body.irritable,
//                         anxious: req.body.anxious,
//                         sleep: req.body.sleep
        
//                     })
//                 }
//             })
//             .catch(err => {console.log(err)})
//         } 
//     })
// })
// .catch(err => {console.log(err)})


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
//         db.user.findOne({
//             where: {id: 1},
//             include: [db.mood]
//         }).then(user => {
//             user.findOrCreate({
//                 where: {
//                     date: req.body.date
//                 }
//             }).then(([mood, created]) => {
//                 if (!created) {
//                     mood.update({
//                         values: {
//                             date: req.body.date,
//                             elevated: req.body.elevated, 
//                             depressed: req.body.depressed,
//                             irritable: req.body.irritable,
//                             anxious: req.body.anxious,
//                             sleep: req.body.sleep
    
//                         }
//                     })
//                 } else {
//                     mood.update({
//                         values: {
//                             elevated: req.body.elevated, 
//                             depressed: req.body.depressed,
//                             irritable: req.body.irritable,
//                             anxious: req.body.anxious,
//                             sleep: req.body.sleep
//                         }
//                     })
//                 }
//             })
    
//        })
//         // console.log(req.body);
//         res.redirect('/track/show')
// })
