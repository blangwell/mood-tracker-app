const express = require('express');
const db = require('../models');
const router = express.Router();
const moment = require('moment');
let today = moment().format('YYYY-MM-DD');
const isLoggedIn = require('../middleware/isLoggedIn')


router.get('/', isLoggedIn, (req, res) => {
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


router.get('/new', isLoggedIn, (req, res) => {
    
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