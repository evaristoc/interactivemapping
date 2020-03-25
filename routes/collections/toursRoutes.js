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
            DB.all("SELECT * FROM toursbyusersTableTest", [], (err, data)=>{res.json(data)})
            //DB.all("SELECT tourname FROM toursTableTest", (err, data)=>{res.json(data)})
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
  .get([auth,
        (req, res)=>{
            //res.status(200).send(`get a tour ${req.params.tourid}`)
            DB.all("SELECT * FROM toursTableTest WHERE tourname='"+req.params.tourid+"'", [], (err, data)=>{res.json(data)})
        }
    ])
  .put([auth,
        (req, res)=>{
            res.status(200).send('update (put) one of my tours')
        }
    ])
  .patch([auth,
          (req, res)=>{
            res.status(200).send('update (patch) one of my tours')
        }
    ])
  .delete([auth,
           (req, res)=>{
                 DB.serialize(()=>{
                    DB
                    .run("BEGIN TRANSACTION")
                    .run("DELETE FROM toursTableTest WHERE tourname='"+req.params.tourid+"'",[],(err)=>{if(err){DB.run("ROLLBACK")}})
                    .run("DELETE FROM toursbyusersTableTest WHERE tour='"+req.params.tourid+"'",[],(err)=>{if(err){DB.run("ROLLBACK")}})
                    .run("COMMIT")
                }); 
                res.status(200).send('delete this tour')
            }
        ])

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
                //console.log(req.params.tourid);
                DB.each("SELECT points FROM toursTableTest WHERE tourname='"+req.params.tourid+"'",[],(err,row)=>{
                    //res.status(200).send('get points of my tour ' + row)
                    res.status(200).json(JSON.parse(row.points))
                })
            }
        ])
  .put([auth,
         (req, res)=>{
                //https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT
                console.log(req.body);
                DB.each("SELECT points FROM toursTableTest WHERE tourname='"+req.params.tourid+"'",[],(err,row)=>{
                    let points = req.body;
                    if (!row.points) {
                        //code
                        row.points = [points];
                        DB.all("UPDATE toursTableTest SET points='"+JSON.stringify(row.points)+"' WHERE tourname='"+req.params.tourid+"'",[],(err,row)=>{
                                            res.status(201).send('create first point for my tour: ');
                                        });
                    }else{
                        rpoints = JSON.parse(row.points);
                        console.log(rpoints, points, rpoints.push(points));
                        //rpoints.push(points);
                        DB.all("UPDATE toursTableTest SET points='"+JSON.stringify(rpoints)+"' WHERE tourname='"+req.params.tourid+"'",[],(err,row)=>{
                                        res.status(204).send('added new points to my tour: ');
                                    });
                    };
                    
                })
            }
        ])
  .delete([auth,
         (req, res)=>{
            res.status(200).send('delete points of my tour');
           }
        ])
  
router
  .route('/:tourid/p/:pointid')
  .get([auth,
        (req, res)=>{
            DB.each("SELECT points FROM toursTableTest WHERE tourname='"+req.params.tourid+"'",[],(err, row)=>{
                    try{
                        let p = JSON.parse(row.points).find(x => x.id == req.params.pointid);
                        res.status(200).json(p);
                    }catch(err){
                        res.status(200).send(err.message); 
                    }
                    
                })
            //res.status(200).send('get a point of my tour')
        }
    ])
  .put([auth,
        (req, res)=>{
            res.status(200).send('update (put) a point of my tour')
        }]
    )
  .patch([auth,
          (req, res)=>{
            res.status(200).send('update (patch) a point of my tour')
        }
    ])
  .delete([auth,
           (req, res)=>{
                res.status(200).send('delete a point of my tour')
            }]
        )



module.exports = router;