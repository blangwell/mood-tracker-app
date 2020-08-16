const d3 = require('d3'), JSDOM = require('jsdom').JSDOM;
let document = jsdom.jsdom(), svg = d3.select(document.body).append('svg');

const jsdom = new JSDOM( wrapper, {runScripts: 'outside-only'})