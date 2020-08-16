const API_KEY = process.env.API_KEY;
const plotly = require('plotly')({'username': 'blangwell', 'apiKey': API_KEY})



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
};

let graphOptions = {
    layout: layout,
    filename: 'test', 
    fileopt: 'overwrite',
    
};



let newPlot = () => {
    plotly.plot(data, graphOptions, function (err, msg) {
    console.log(`MESSAGE : ${msg.url}`)
    return msg.url;
});
}

exports.newPlot = newPlot;