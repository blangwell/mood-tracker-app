let moment = require('moment')
const date = moment().format('MM-DD-YYYY')
let yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY')
let db = require('./models')
// console.log(yesterday)

// loop through last seven days
for (let i = 0; i<=7; i++) {
    let day = moment().subtract(i, 'day').format('MM-DD-YYYY')
    console.log(day)
}

// new date format^