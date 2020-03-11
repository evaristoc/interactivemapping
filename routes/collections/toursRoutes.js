var express = require('express');
var router = express.Router();

router
.get('/',[(req,res)=>{res.send('this is all tours')}])
.post('/',[(req,res)=>{res.send('make a tour')}])
.get('/:tourid',[(req,res)=>{res.send(`this is a tour ${req.params.tourid}`)}])

module.exports = router;