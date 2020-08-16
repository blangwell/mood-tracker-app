const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const plotly = require('plotly')({'username': 'blangwell', 'apiKey': API_KEY})

router.get('/', (req, res) => {
    let data = [
        {
            x: ['test1', 'test2', 'test3'],
            y: [20, 14, 23],
            type: 'bar'
        }
    ]
    
    let graphOptions = {filename: 'basic-bar', fileopt: 'overwrite'};
    let newPlot = plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg.url);
    })
    res.render('track/index', {plot: newPlot})
})

router.get('/new', (req, res) => {
    res.render('track/new')
})





module.exports = router;