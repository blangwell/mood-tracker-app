const db = require('./models');
const moment = require('moment');
// const { QueryInterface } = require('sequelize/types');
const date = moment().format('YYYY-MM-DD')
const sequelize = require('sequelize');

// db.mood.create({
//     date: date,
//     elevated: 0,
//     depressed: 1,
//     irritable: 2,
//     anxious: 3, 
//     sleep: 6.5
// }
// ).then(m => {
//     console.log(m.get())
// })

// REQ.USER.ID
// db.user.findOne({
//     where: {id: req.user.id}
// })
// .then(user => {
//     console.log
//     db.mood.findOrCreate({
//         where: {
//             date: '2020-8-23',
//             elevated: 2,
//             depressed: 2,
//             irritable: 3,
//             anxious: 1, 
//             sleep: 5
//         }
//     })
//     .then(([mood, created]) => {
//         console.log(mood, created)
//         user.addMood(mood)
//         .then(relationInfo => {
//             console.log(mood, 'added to', user.name)
//         })
//         .catch(err => {console.log(`ERROR!!!! FIRST CATCH ${err}`)})
//     })
//     .catch(err => {console.log(`ERROR!!!! SECOND CATCH ${err}`)})
// })
// .catch(err => {console.log(`ERROR!!!! SECOND CATCH ${err}`)})


// for (let i=0; i<clientDates.length; i++){
//     db.mood.findAll({
//         where: {date: clientDates[i]}
//     })
//     .then({

//     })
// }


// db.user.create({
//     name: 'barent',
//     email: 'cooldude@cool.co',
//     pwd: 'password'
// })

// console.log(moment().format('YYYY-MM-DD'))

// // db.mood.findOrCreate({
// //     where: {date: date},
// //     defaults: {depressed: 3}
// // }).then(([result, created]) => {console.log(result, created)})



// QueryInterface.addColumn('user', 'medication', Sequelize.STRING, {
//     after: 'password'
// });

// db.user.findOne({
//     where: {id: 1}
// }).then(user => {
//     user.getMoods().then(m => {
//         console.log(m)
//     })
// })

// const currentUser = db.user.findOne({
//     where: {id: 1}
// }).then(user => {
//     user.getMoods()
//     .then(moods => {
//         console.log(moods);
//         moods.forEach(m => {
//             console.log(`\nDATE: ${m.date}`)
//             console.log(`elevated mood level: ${m.elevated}`)
//             console.log(`depression level: ${m.depressed}`)
//             console.log(`irritability level: ${m.irritable}`)
//             console.log(`anxiety level: ${m.anxious}`)
//             console.log(`${m.sleep} hours of sleep`)

//         })
//     })
// })

// db.user.findOne({
//     where: {id: 1},
//     include: [db.mood]
// }).then(user => {
    
//     console.log(`U MOOD - ${user.moods}`)
//     user.moods.findOrCreate({
//         where: {date: req.body.date},
//         defaults: {
//             date: req.body.date,
//             elevated: req.body.elevated, 
//             depressed: req.body.depressed,
//             irritable: req.body.irritable,
//             anxious: req.body.anxious,
//             sleep: req.body.sleep

//         }
//     })
    
// })


// db.user.findOne({
//     where: {id: 1},
//     include: [db.mood]
// }).then(user => {
    
//     console.log(`U MOOD - ${user.moods}`)
//     user.getMoods().then(moods => {
//         moods.forEach(m => {
//             if (m.date == req.body.date) {
//                 m.set({
//                     elevated: req.body.elevated, 
//                     depressed: req.body.depressed,
//                     irritable: req.body.irritable,
//                     anxious: req.body.anxious,
//                     sleep: req.body.sleep
//                 })
//             }
//         })
//         console.log(moods)
//     })
// })

    // let dateArray = [];
    // let moodObjectArray = [];

    // // get last seven days
    // for (let i = 0; i<=7; i++) {
    //     let day = moment().subtract(i, 'day').format('YYYY-MM-DD')
    //     dateArray.push(day)
    // }
    //     db.user.findOne({
    //         // TODO change to req.user.id (must be logged in ya dummy)
    //         where: {id: 3},
    //         include: [db.mood]
    //     })
    //     .then(user => {
    //         // loop through moods associated w user
    //         // if (mood.date) === dateArray[i] {foundMoods.push(mood)}
    //         // loop thru foundMoods and dateArray
    //         user.moods.forEach(m => {
    //             // M IS ITERATING SUCCESSFULLY
    //             // console.log(m)
    //             // foundMoods = {}
    //             dateArray.forEach(d => { // PROBLEM LOGIC
    //                     foundMoods = {[d]: {
    //                         date: null,
    //                         elevated: null,
    //                         depressed: null,
    //                         irritable: null,
    //                         anxious: null,
    //                         sleep: null
    //                     }};
    //                     console.log(d)
    //                 // moodObjectArray.indexOf(m) == -1
    //                 // !m in moodObjectArray
    //                 if (d == m.date) {
    //                     // make key/value d : {foundMoods.date....} ?
    //                     foundMoods[d] = d;
    //                     foundMoods[d].date = d;
    //                     foundMoods[d].elevated = m.elevated;
    //                     foundMoods[d].depressed = m.depressed;
    //                     foundMoods[d].irritable = m.irritable;
    //                     foundMoods[d].anxious = m.anxious;
    //                     foundMoods[d].sleep = m.sleep;
    //                     moodObjectArray.push(foundMoods)
    //                 } 
    //             })
    //         })
    //         console.log(moodObjectArray)
    //     })
    //     .catch(err => {console.log(err)})


    // let dateArray = [];
    // let moodObjectArray = [];

    // // get last seven days
    // for (let i = 0; i<=7; i++) {
    //     let day = moment().subtract(i, 'day').format('YYYY-MM-DD')
    //     dateArray.push(day)
    // }
    //     db.user.findOne({
    //         // TODO change to req.user.id (must be logged in ya dummy)
    //         where: {id: 3},
    //         include: [db.mood]
    //     })
    //     .then(user => {
    //         // loop through moods associated w user
    //         // if (mood.date) === dateArray[i] {foundMoods.push(mood)}
    //         // loop thru foundMoods and dateArray
    //         user.moods.forEach(m => {
    //             // M IS ITERATING SUCCESSFULLY
    //             foundMoods = {}
    //             // console.log(m)
    //             dateArray.forEach(d => { // PROBLEM LOGIC
    //                 // moodObjectArray.indexOf(m) == -1
    //                 // !m in moodObjectArray
    //                 if (d == m.date) {
    //                     // make key/value d : {foundMoods.date....} ?
    //                     foundMoods.date = d;
    //                     foundMoods.elevated = m.elevated;
    //                     foundMoods.depressed = m.depressed;
    //                     foundMoods.irritable = m.irritable;
    //                     foundMoods.anxious = m.anxious;
    //                     foundMoods.sleep = m.sleep;
    //                     moodObjectArray.push(foundMoods)
    //                 } 
    //             })
    //         })
    //         const compare = (a,b) => {
    //             let comparison = 0;
    //             if (a.date > b.date) {
    //                 comparison = 1
    //             } else if (a.date < b.date) {
    //                 comparison= -1;
    //             }
    //             return comparison
    //         }

    //         moodObjectArray.sort(compare);
    //         console.log(moodObjectArray)
    //     })

    // router.get('/logout', (req, res) => {
    //     req.logOut();
    //     // FLASH MESSAGE  
    //     req.flash('success', 'Logged out Successfully! See you soon!')
    //     res.redirect('/');
    //   })

    // let dateArray = [];
    // let moodObjectArray = [];

    // // get last seven days
    // for (let i = 0; i<=7; i++) {
    //     let day = moment().subtract(i, 'day').format('YYYY-MM-DD')
    //     dateArray.push(day)
    // }
    //     db.user.findOne({
    //         // TODO change to req.user.id (must be logged in ya dummy)
    //         where: {id: 3},
    //         include: [db.mood]
    //     })
    //     .then(user => {
    //         // loop through moods associated w user
    //         // if (mood.date) === dateArray[i] {foundMoods.push(mood)}
    //         // loop thru foundMoods and dateArray
    //         user.moods.forEach(m => {
    //             foundMoods = {}
    //             dateArray.forEach(d => { // PROBLEM LOGIC
    //                 if (d == m.date) {
    //                     // make key/value d : {foundMoods.date....} ?
    //                     foundMoods.date = d;
    //                     foundMoods.elevated = m.elevated;
    //                     foundMoods.depressed = m.depressed;
    //                     foundMoods.irritable = m.irritable;
    //                     foundMoods.anxious = m.anxious;
    //                     foundMoods.sleep = m.sleep;
    //                     if (!moodObjectArray.includes(m.date)){
    //                         moodObjectArray.push(foundMoods)
    //                     } 
    //                 } 
    //             })
    //         })

    //         // REMOVES DUPLICATES FROM EJS BOUND ARRAY
    //         // I WONT NEED THIS AFTER I FIX THE DUPLICATION ISSUE

    //         // let moodSet = Array.from(new Set(moodObjectArray.map(a => a.date)))
    //         // .map(date => {
    //         //     return moodObjectArray.find(a => a.date === date)
    //         // })
    //         // console.log(moodSet)

    //         // let removeDuplicates = [...moodSet]

    //         // sort moodObjectArray by date
    //         const compare = (a,b) => {
    //             let comparison = 0;
    //             if (a.date > b.date) {
    //                 comparison = 1
    //             } else if (a.date < b.date) {
    //                 comparison= -1;
    //             }
    //             return comparison
    //         }

    //         moodObjectArray.sort(compare);
    //         // console.log(moodObjectArray)

    //         // moodObjectArray = moodObjectArray.sort((a,b) => {return b-a});
    //         // console.log(moodObjectArray)
    //     })


    // db.user.findOne({
    //     where: {id: 1},
    //     include: [db.mood]
    // })
    // .then(user => {
    //     console.log('USER.MOODS : ', user.moods)
    //     user.getMoods({
    //         where: {date: '2020-08-20'}
    //     })
    //     .then(m => {
    //         console.log('FOUND : ', m)
            // user.setMoods(
            //     {where: {date: '2020-08-20'}},
            //     {
            //     date: '2020-08-20',
            //     elevated: 0,
            //     depressed: 0,
            //     irritable: 0,
            //     anxious: 0, 
            //     sleep: 10
            // })
        // })
        // .catch(err => {console.log(err)})
           
        // })
        // user.moods.forEach(mood => {
            // let updateVals = {
            //     date: mood.date,
            //     elevated: mood.elevated,
            //     depressed: mood.depressed,
            //     irritable: mood.irritable,
            //     anxious: mood.anxious,
            //     sleep: mood.sleep
            // }
            // // console.log(mood.date)
            // // date string becomes d var 
            // if (mood.date == '2020-08-20') {
            //     console.log(mood.date)
            //     db.mood.update(
            //         updateVals, {where: {: 1}}
            //     )
            // }
        // })
        
    // })
    // .catch(err => {console.log(err)})
    
    
    // let userMoods = user.moods;
    
    // db.mood.findOrCreate({
    //     where: {
    //         date: date,
    //     },
    //     defaults: {
    //         date: date,
    //         elevated: 0,
    //         depressed: 0,
    //         irritable: 0,
    //         anxious: 0,
    //         sleep: 0
            
    //     }
    // })
    // .then(([mood, created]) => {
    //     console.log(`MOOD: ${mood} | CREATED: ${created}`)
    // })

    db.user.findOne({
        where: {id: 10},
        include: [db.mood]
    })
    .then(user => {
        // console.log('hitting the user : ', user.dataValues.moods[0].usersMoods)
        // console.log(user.moods[0].usersMoods.dataValues.moodId)
        user.moods.forEach(m => {
            // ACCESS FOREIGN KEY
            console.log(m.usersMoods.dataValues.moodId)


        })
    })