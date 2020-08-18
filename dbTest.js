const db = require('./models');
const moment = require('moment');
// const { QueryInterface } = require('sequelize/types');
const date = moment().format('YYYY-MM-DD')
const sequelize = require('sequelize')

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


db.user.findOne({
    where: {id: 1}
})
.then(user => {
    console.log
    db.mood.findOrCreate({
        where: {
            date: '2020-8-23',
            elevated: 2,
            depressed: 2,
            irritable: 3,
            anxious: 1, 
            sleep: 5
        }
    })
    .then(([mood, created]) => {
        console.log(mood, created)
        user.addMood(mood)
        .then(relationInfo => {
            console.log(mood, 'added to', user.name)
        })
        .catch(err => {console.log(`ERROR!!!! FIRST CATCH ${err}`)})
    })
    .catch(err => {console.log(`ERROR!!!! SECOND CATCH ${err}`)})
})
.catch(err => {console.log(`ERROR!!!! SECOND CATCH ${err}`)})


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
