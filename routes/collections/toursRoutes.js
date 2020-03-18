var express = require('express');
var router = express.Router();
var DB = require('../../models/testdata/').appsql3DB;

/*MIDDLEWARE*/
//-- https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/
//-- https://auth0.com/blog/create-a-simple-and-secure-node-express-app/
//
//-- https://www.codershood.info/2018/06/16/creating-api-rate-limiter-in-nodejs-using-express-and-redis/
//
var auth = (req, res, next)=>{
    //if(req.params.userid=='1'){
    //    res.locals.user = 'me';
    //}else{
    //    res.locals.user = req.params.userid;
    //};
    next();
    }


/* ALL TOURS */
router
    .route('/')
    .get([(req,res)=>{
            //let alltours = [];
            //var p = new Promise((resolve, reject)=>{
            //            DB.each(
            //                "SELECT * FROM toursTableTest", (err, row)=>{
            //                if (err) {
            //                    //code
            //                    reject(err);
            //                }
            //                //console.log(row); //+ ", " + row.email + ", " + row.username
            //                alltours.push(row);
            //            });
            //            console.log(alltours.length);
            //            return resolve(alltours);
            //});
            ////res.send('this is all tours')
            //p.then((promiseddata)=>{console.log(promiseddata);}).catch((err)=> {console.log(err)});
            //res.send('done');
            DB.all("SELECT * FROM toursTableTest", (err, data)=>{res.json(data)})
        }])


/* SINGLE TOUR */
/*
  I can:  
  -- get info of a single tour
  -- update a single tour
  -- delete a single tour
*/
router
  .route('/:tourid') //OBS: what if the person is not registered so no userid? Sessions?
  .get([auth, (req, res)=>{res.status(200).send(`get a tour ${req.params.tourid}`)}])
  .put([auth, (req, res)=>{res.status(200).send('update (put) one of my tours')}])
  .patch([auth, (req, res)=>{res.status(200).send('update (patch) one of my tours')}])
  .delete([auth, (req, res)=>{res.status(200).send('delete this tour')}])

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
router
  .route('/:tourid/p')
  .get([auth,
        (req, res)=>{
                DB.each("SELECT points FROM toursTableTest WHERE tourname='Lorem1'",[],(err,row)=>{
                    //res.status(200).send('get points of my tour ' + row)
                    res.status(200).json(JSON.parse(row.points))
                })
            }
        ])
  .post([auth,
         (req, res)=>{
            console.log(req.body);
            DB.run("UPDATE toursTableTest SET points='"+JSON.stringify(req.body)+"' WHERE tourname='Lorem1'");
            res.status(200).send('create of point for my tour: ');
            }
        ])
  .delete([auth, (req, res)=>{res.status(200).send('delete points of my tour')}])
  
router
  .route('/:tourid/p/:pointid')
  .get([auth, (req, res)=>{res.status(200).send('get a point of my tour')}])
  .put([auth, (req, res)=>{res.status(200).send('update (put) a point of my tour')}])
  .patch([auth, (req, res)=>{res.status(200).send('update (patch) a point of my tour')}])
  .delete([auth, (req, res)=>{res.status(200).send('delete a point of my tour')}])



module.exports = router;