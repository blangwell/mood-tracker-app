const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const plotly = require('plotly')({'username': 'blangwell', 'apiKey': API_KEY})
const axios = require('axios')

router.get('/', (req, res) => {
    let data = [
        {
            x: ['monday', 'tuesday', 'wednesday'],
            y: [0, 1, 2, 3],
            type: 'bar'
        }
    ]
    
    let graphOptions = {filename: 'basic-bar', fileopt: 'overwrite'};
    let newPlot = plotly.plot(data, graphOptions, function (err, msg) {
        let embedUrl = `${msg.url}.embed`;
        console.log(`${msg.url}.embed`);
        res.render('track/index', {url: msg.url})
        r
    })

})

router.get('/new', (req, res) => {
    res.render('track/new')
})





module.exports = router;