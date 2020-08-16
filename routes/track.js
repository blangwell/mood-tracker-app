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
    let data = [
        {
            x: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            y: ['0', '1', '2', '1', '0'],
            type: 'bar',
        }
    ]
    
    let layout = {
        title: 'Anxiety',
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
        let embedUrl = `${msg.url}.embed`;
        console.log(`${msg.url}.embed`);
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