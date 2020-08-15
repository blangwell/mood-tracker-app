const db = require('./models');
const moment = require('moment');
const { QueryInterface } = require('sequelize/types');
const date = moment().format('YYYY-MM-DD')

// // db.mood.create({
// //     date: date,
// //     elevated: 0,
// //     depressed: 1,
// //     irritable: 2,
// //     anxious: 3, 
// //     sleep: 6.5
// // }
// // ).then(m => {
// //     console.log(m.get())
// // })

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

QueryInterface.addColumn('user', 'medication', Sequelize.STRING, {
    after: 'password'
});