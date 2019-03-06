'use strict';
const express = require('express');
const fs = require('fs');
const router = express.Router();

/* GET home page. */
router.route('/')
    .get((req, res) => {
        res.render('home', { title: 'Hello Docker', data: null });
    });

module.exports = router;