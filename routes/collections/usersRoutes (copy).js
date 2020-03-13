var express = require('express');
var router = express.Router();
const usersHandlers = require('../../controllers/handlers/usersHandlers')


/*MIDDLEWARE*/

router.param('myid', (req,res,next,val)=>{console.log('user middleware', val); next()})

router
  .route('/:userid')
  .get([(req, res)=>{res.status(200).send(`see other user ${req.params.userid}`)}])


module.exports = router;
