const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const plotly = require('plotly')({'username': 'blangwell', 'apiKey': API_KEY})
const axios = require('axios')
const chartHelper = require('../chartHelper')

router.get('/', (req, res) => {
    // let chart = chartHelper.newPlot();
    // axios.get(chart)
    // .then(response => {
    //     console.log(response)
    //     res.render('track/index', {url: `${response}.png`})
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    // THIS GOES INTO A FOR LOOP

    let elevatedTrace = {
        x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        y: [0, 1, 3, 2, 0, 3, 2],
        name: 'elevated mood',
        type: 'bar'
    }
    let depressedTrace = {
        x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        y: [2, 3, 1, 3, 0, 1, 0],
        name: 'depression',
        type: 'bar'
    }
    // let irritableTrace = {
    //     x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    //     y: [1, 2, 1, 3, 3, 1, 2],
    //     name: 'irritability',
    //     type: 'bar'
    // }
    // let anxiousTrace = {
    //     x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    //     y: [1, 2, 1, 3, 3, 1, 2],
    //     name: 'anxiety',
    //     type: 'bar'
    // }

    let data = [elevatedTrace, depressedTrace];
    
    let layout = {
        title: 'Week View',
        xaxis: {
            title: 'Day',
            titlefont: {
                family: 'Helvetica, monospace',
                size: 15,
                color: '#000000'
            }
        },
        yaxis: {
            title: 'Severity from 0-3',
            titlefont: {
                family: 'Helvetica, monospace',
                size: 15,
                color: '#000000'
            }
        }
    }

    let graphOptions = {
        layout: layout,
        filename: 'test', 
        fileopt: 'overwrite',
        
    };

    let newPlot = plotly.plot(data, graphOptions, function (err, msg) {
        if (err) console.log(err)
        console.log(msg)
        // let embedUrl = `${msg.url}.embed`;
        // console.log(`${msg.url}.embed`);
        axios.get(msg.url)
        .then(response => {
            console.log(response)
            res.render('track/index', {url: `${response.config.url}.png`})

        })
    })
})

router.get('/new', (req, res) => {
    
    res.render('track/new')
})


module.exports = router;