let moment = require('moment')
const date = moment().format('MM-DD-YYYY')
let yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY')
let db = require('./models')
const flatpickr = require('flatpickr')
// console.log(yesterday)

// loop through last seven days
let dateArray = []
for (let i = 0; i<=7; i++) {
    let day = moment().subtract(i, 'day').format('MM-DD-YYYY')
    dateArray.push(day)
}
console.log(dateArray)

db.mood.findOne({
    where: {date: dateArray[0].toString()}
})
.then(result => {console.log(`RESULT : ${result.depressed}`)})

// new date format^