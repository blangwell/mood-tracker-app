const express = require('express');
const db = require('../models');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const axios = require('axios')

router.get('/', (req, res) => {
    res.render('track/index')

})


router.get('/new', (req, res) => {
    
    res.render('track/new')
})


module.exports = router;