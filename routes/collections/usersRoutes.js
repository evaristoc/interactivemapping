var express = require('express');
var router = express.Router();
const usersHandlers = require('../../controllers/handlers/usersHandlers')

/* GET users listing. */
//https://www.restapitutorial.com/lessons/httpmethods.html
router
  /*EVERYONE*/
  .get('/', function(req, res, next) {
    let view = usersHandlers.findAll().then((data) => {res.send(data)}).catch((err) => {return null});
    //res.send(`view ${view}`);
  })
  /*ME*/
  .get('/me', [(req, res)=>{res.send('get me')}])
  .put('/me?key=value', [(req, res)=>{res.send(`update ${req.query}`)}])
  .delete('/me', [(req, res)=>{res.send('delete')}])
  /*My TOURS*/
  .get('/me/t', [(req, res)=>{res.send('get my tours')}])
  .post('me/t', [(req, res)=>{res.send('create a tour')}])
  .delete('/me/t', [(req, res)=>{res.send('delete my tours')}])
  .get('/me/t/:tourid', [(req, res)=>{res.send(`get a tour ${req.params.userid}`)}])
  .put('/me/t/:tourid?key=value', [(req, res)=>{res.send('update (put) one of my tours')}])
  .patch('/me/t/:tourid?key=value', [(req, res)=>{res.send('update (patch) one of my tours')}])
  .delete('/me/t/:tourid', [(req, res)=>{res.send('delete this tour')}])
  /*The POINTS of my TOURS*/
  .get('/me/t/:tourid/p', [(req, res)=>{res.send('get points of my tour')}])
  .post('/me/t/:tourid/p', [(req, res)=>{res.send('create of point for my tour')}])
  .delete('/me/t/:tourid/p', [(req, res)=>{res.send('delete points of my tour')}])
  .get('/me/t/:tourid/p/:pointid', [(req, res)=>{res.send('get a point of my tour')}])
  .put('/me/t/:tourid/p/:pointid?key=value', [(req, res)=>{res.send('update (put) a point of my tour')}])
  .patch('/me/t/:tourid/p/:pointid?key=value', [(req, res)=>{res.send('update (patch) a point of my tour')}])
  .delete('/me/t/:tourid/p/:pointid', [(req, res)=>{res.send('delete a point of my tour')}])
  /*OTHER SINGLE USERS*/
  .get('/:userid', [(req, res)=>{res.send(`see other user ${req.params.userid}`)}])


module.exports = router;
