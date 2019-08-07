const express = require ('express');
const router = express.Router();
const model = require('../Channel');




router.get('/csv', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=sample.csv'
    });
    model.find().csv(res);
})

module.exports = router;