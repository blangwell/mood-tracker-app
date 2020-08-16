const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const plotly = require('plotly')({'username': 'blangwell', 'apiKey': API_KEY})
const axios = require('axios')

router.get('/', (req, res) => {
    let data = [
        {
            x: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            y: ['0', '1', '2', '1', '0'],
            type: 'bar',
        }
    ]
    
    let layout = {
        title: 'Heres my title',
        xaxis: {
            title: 'x axis',
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
    // let data = [
    //         {
    //             x: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    //             y: ['0', '1', '2', '1', '0'],
    //             marker: {
    //                 severity: ['none', 'mild', 'moderate', 'severe']
    //             },
    //             type: 'bar',
    //             title: 'anxiety'
    //         }
    //     ]
    
    // let layout = {
    //     title: 'anxiety',
    //     showlegend: false
    //     };
    
    // plotly.plot(data, layout, (err, msg) => {
    //     if (err) return console.log(err);
    //     console.log(msg);
    // });

})

router.get('/new', (req, res) => {
    res.render('track/new')
})





module.exports = router;