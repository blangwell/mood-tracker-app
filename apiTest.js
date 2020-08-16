const API_KEY = process.env.API_KEY;
const plotly = require('plotly')({'username': 'blangwell', 'apiKey': API_KEY, 'host': 'http://localhost', 'port': 3000})

let data = [
    {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
    }
]

let graphOptions = {filename: 'basic-bar', fileopt: 'overwrite'};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
})
