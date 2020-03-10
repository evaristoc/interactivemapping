var express = require('express');
var router = express.Router();
const usersHandlers = require('../../controllers/handlers/usersHandlers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let view = usersHandlers.findAll().then((data) => {res.send(data)}).catch((err) => {return null});
  //res.send(`view ${view}`);
});

module.exports = router;
