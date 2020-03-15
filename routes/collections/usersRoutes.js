var express = require('express');
var router = express.Router();
var db = require('../../models/testdata/');

/*MIDDLEWARE*/
var auth = (req, res, next)=>{
    console.log(db.usersDB.find({'$loki':{'$eq':1}}));
    if(req.params.userid=='1'){
        res.locals.user = 'me';
    }else{
        res.locals.user = req.params.userid;
    };
    next();
    }
//router.param('myid', (req,res,next,val)=>{console.log('user middleware', val); next()})

//https://www.restapitutorial.com/lessons/httpmethods.html
router
  .route('/')
  .post([(req,res)=>{db.applfDB.create(req); res.send('created!')}])



  /*ME*/
  /*
  I can:
  -- get personal info (initialized when registring); limited based on auth
  -- modify my personal info
  -- delete my records
  */
router
  .route('/:userid')
  .get([auth, (req, res)=>{res.status(200).send(`get ${res.locals.user}`)}])
  .put([auth, (req, res)=>{res.status(200).json(req.query)}])
  .delete([auth, (req, res)=>{res.status(200).send('delete me')}])
   
  /*My TOURS*/
  /*
  I can:
  -- get list of user's tours
  -- create a new tour
  -- delete all of some of my tours at once
  */
router
  .route('/:userid/t')
  .get([(req, res)=>{res.status(200).send('get my tours')}])
  .post([auth, (req, res)=>{res.status(200).send('create a tour')}])
  .delete([auth, (req, res)=>{res.status(200).send('delete my tours')}])
  


  
module.exports = router;