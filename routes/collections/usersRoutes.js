var express = require('express');
var router = express.Router();
const usersHandlers = require('../../controllers/handlers/usersHandlers')

/* GET users listing. */
//https://www.restapitutorial.com/lessons/httpmethods.html
router
  ///*EVERYONE*/
  //.get('/', function(req, res, next) {
  //  let view = usersHandlers.findAll().then((data) => {res.status(200).send(data)}).catch((err) => {return null});
  //  //res.send(`view ${view}`);
  //})
  /*ME*/
  /*
  I can:
  -- get my personal info (initialized when registring)
  -- modify my personal info
  -- delete all my info
  */
  .get('/me', [(req, res)=>{res.status(200).send('get me')}])
  .put('/me', [(req, res)=>{res.status(200).json(req.query)}])
  .delete('/me', [(req, res)=>{res.status(200).send('delete me')}])
  /*My TOURS*/
  /*
  I can:
  -- get all my tours
  -- create a new tour
  -- delete all of some of my tours at once
  -- get the info of one of my tours
  -- update one of my tours
  -- delete a single tour
  */
  .get('/me/t', [(req, res)=>{res.status(200).send('get my tours')}])
  .post('me/t', [(req, res)=>{res.status(200).send('create a tour')}])
  .delete('/me/t', [(req, res)=>{res.status(200).send('delete my tours')}])
  .get('/me/t/:tourid', [(req, res)=>{res.status(200).send(`get a tour ${req.params.userid}`)}])
  .put('/me/t/:tourid?key=value', [(req, res)=>{res.status(200).send('update (put) one of my tours')}])
  .patch('/me/t/:tourid?key=value', [(req, res)=>{res.status(200).send('update (patch) one of my tours')}])
  .delete('/me/t/:tourid', [(req, res)=>{res.status(200).send('delete this tour')}])
  /*The POINTS of my TOURS*/
  /*
  I can:
  -- get all the points of a tour
  -- create a new point of a tour
  -- delete all or some of the points of a tour
  -- get a single point of a tour
  -- update a single point of a tour
  -- delete a single point of a tour
  */
  .get('/me/t/:tourid/p', [(req, res)=>{res.status(200).send('get points of my tour')}])
  .post('/me/t/:tourid/p', [(req, res)=>{res.status(200).send('create of point for my tour')}])
  .delete('/me/t/:tourid/p', [(req, res)=>{res.status(200).send('delete points of my tour')}])
  .get('/me/t/:tourid/p/:pointid', [(req, res)=>{res.status(200).send('get a point of my tour')}])
  .put('/me/t/:tourid/p/:pointid?key=value', [(req, res)=>{res.status(200).send('update (put) a point of my tour')}])
  .patch('/me/t/:tourid/p/:pointid?key=value', [(req, res)=>{res.status(200).send('update (patch) a point of my tour')}])
  .delete('/me/t/:tourid/p/:pointid', [(req, res)=>{res.status(200).send('delete a point of my tour')}])
  /*OTHER SINGLE USERS*/
  /*
  I can:
  -- get (limited) info about a single user
  //-- XXX get all tours of a single user
  //-- XXX get a single tour of a single user
  
  To get information about tours by user, go to tours router (assume tours are more important than users)
  Like Medium - entering to the author through the article
  */
  .get('/:userid', [(req, res)=>{res.status(200).send(`see other user ${req.params.userid}`)}])
  //.get('/:userid/t', [(req, res)=>{res.status(200).send('all tours of a single user')}])
  //.get('/:userid/t/:tourid', [(req, res)=>{res.status(200).send('a single tour of a single user')}])


module.exports = router;
