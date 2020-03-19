//https://www.quora.com/What-are-the-best-databases-to-use-for-Node-js-applications
//https://www.slant.co/topics/179/~best-databases-to-use-for-node-js-applications
//https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/

/**************/
/*** lokiJS ***/
/**************/

var lokijs = require('lokijs');

var db = new lokijs('Tours');

/*USER SCHEMA
_id (userid)
name
email
username
password
tours[]
created
modified
*/
var usersDB = db.addCollection('users');
var odin = usersDB.insert( { name : 'odin', email: 'odin.soap@lokijs.org', passport: 'test', tours:['odintour'], created:new Date(), modified:'' } );

/*TOUR SCHEMA
_id (tourid)
owner (userid)
name
center
points[]
created
modified
*/
var toursDB = db.addCollection('tours');
var odintours = toursDB.insert( { name : 'odintour', owner:'', points:[], created:new Date(), modified:'' } );

/*POINT SCHEMA
created (as id)
tour (tourid)
order
coordinates{lng,lat}
media
modified
*/
var pointsDB = db.addCollection('points');

//////////////////////////////////////////////////////


/**************/
/*** lovefield(-node) ***/
/**************/

//https://itnext.io/indexeddb-your-second-step-towards-progressive-web-apps-pwa-dcbcd6cc2076
//https://github.com/google/lovefield
//https://github.com/google/lovefield/blob/master/demos/todo/README.md
//https://stackoverflow.com/questions/31378997/express-js-limit-api-access-to-only-pages-from-the-same-website

/** NOT WORKING FOR NODE.JS, apparently only front-end **/

//var lf = require('lovefield-node');
////with lf, schema is database
//var applfDB = lf.schema.create('toursDB', 1);
//
//applfDB.createTable('usersTable').
//    addColumn('userid', lf.Type.INTEGER).
//    addColumn('name', lf.Type.STRING).
//    addColumn('email', lf.Type.STRING).
//    addColumn('username', lf.Type.STRING).
//    addColumn('passport', lf.Type.STRING).
//    addColumn('saltedpassport', lf.Type.STRING).
//    addColumn('created', lf.Type.DATE_TIME).
//    addColumn('modified', lf.Type.DATE_TIME).
//    addNullable(['modified']).
//    addPrimaryKey(['userid'])
//
//applfDB.createTable('toursTable').
//    addColumn('tourid', lf.Type.INTEGER).
//    addColumn('tourname', lf.Type.STRING).
//    addColumn('lngCenter', lf.Type.NUMBER).
//    addColumn('latCenter', lf.Type.NUMBER).
//    /*POINT SCHEMA
//    created (as id)
//    tour (tourid) <- not required in this case
//    order
//    coordinates{lng,lat}
//    media
//    modified
//    */
//    addColumn('points', lf.Type.OBJECT).
//    addColumn('created', lf.Type.DATE_TIME).
//    addColumn('modified', lf.Type.DATE_TIME).
//    addNullable(['modified']).
//    addPrimaryKey(['tourid'])
//    
//applfDB.createTable('toursBYuserTable').
//    addColumn('_tour', lf.Type.INTEGER).
//    addColumn('_user', lf.Type.INTEGER).
//    addForeignKey('fk_tourid', {
//      local: '_tour',
//      ref: 'toursTable.tourid'
//    }).
//    addForeignKey('fk_userid', {
//      local: '_user',
//      ref: 'usersTable.userid'
//    }).
//    addIndex('idxByUser', ['_user'], false, lf.Order.ASC)


/**************/
/*** sqlite3 ~with promises~ ***/
/**************/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
//https://stackabuse.com/a-sqlite-tutorial-with-node-js/
//https://www.w3resource.com/node.js/nodejs-sqlite.php
//Transactions in sqlite3 + node.js and others:
//-- https://stackoverflow.com/questions/39417819/sqlite-transactions-in-nodejs
//-- https://medium.com/@elliotchance/sql-transaction-isolation-levels-explained-50d1a2f90d8f
//OBS: transactions and concurrency in sqlite
//-- https://www.sqlite.org/cgi/src/doc/begin-concurrent/doc/begin_concurrent.md
//   (BUT I dont have that problem because in my project it is only one owner + admin who would have writing privileges)

//... plus GraphQL + Apollo + Vue.js
//https://dev.to/jgilbertcastro/build-a-simple-blog-with-graphql-node-js-sqlite-and-vue-angular-or-reactjs-3923
//https://dev.to/jgilbertcastro/build-a-simple-blog-with-graphql-node-js-sqlite-and-vue-angular-or-reactjs-part-2-201j
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
//const fs = require('fs');
//var toursDBfile = fs.openSync(__dirname+'/testfiles/tours.db')


//we will use this later for transactions...
sqlite3.Database.prototype.runAsync = function (sql, ...params) {
    return new Promise((resolve, reject) => {
        this.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve(this);
        });
    });
};

var appsql3DB = new sqlite3.Database(path.join(__dirname,'testfiles/tours.db'), ()=>{console.log('Successfully opening tours.db'), (err)=>{console.error('An issue was found opening tours.db: ', err)}});


appsql3DB.serialize(()=>{
  
  	
  appsql3DB.run("DROP TABLE IF EXISTS lorem");
  
  appsql3DB.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");

  var stmt = appsql3DB.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  //appsql3DB.each("SELECT rowid AS id, info FROM lorem", (err, row)=>{
  //    console.log(row.id + ": " + row.info);
  //});
  //
});

appsql3DB.close(()=>{console.log('Successfully closing tours.db')}, (err)=>{console.error('An error occurred when closing tours.db: ', err)});

//appsql3DB = new sqlite3.Database(__dirname,'testfiles/tours.db');
appsql3DB = new sqlite3.Database(path.join(__dirname,'testfiles/tours.db'), ()=>{console.log('Successfully opening tours.db'), (err)=>{console.error('An issue was found opening tours.db: ', err)}});

appsql3DB.serialize(()=>{
  //appsql3DB.run(`
  //              CREATE TABLE usersTable (
  //                                        //userid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  //                                        name NVARCHAR(20) NOT NULL
  //                                        //,
  //                                        //email NVARCHAR(20) NOT NULL,
  //                                        //username NVARCHAR(20) NULL,
  //                                        //passport NVARCHAR(10) NOT NULL,
  //                                        //saltedpassport NVARCHAR(100) NOT NULL,
  //                                        //created INTEGER NOT NULL,
  //                                        //modified INTEGER NULL
  //                                        )
  //              `);

  //appsql3DB.run("CREATE TABLE usersTable (name TEXT)"); //VARCHAR(20) NOT NULL

  //console.log(1111, appsql3DB.status);
  appsql3DB.run("DROP TABLE IF EXISTS usersTableTest");
  appsql3DB.run("DROP TABLE IF EXISTS toursTableTest");
  appsql3DB.run("DROP TABLE IF EXISTS toursbyusersTableTest");
  appsql3DB.run("DROP INDEX IF EXISTS toursbyusersIndexTest");
  
  appsql3DB.run("CREATE TABLE IF NOT EXISTS usersTableTest (name VARCHAR(20) NOT NULL, " +
                "email NVARCHAR(20) NOT NULL, " +
                "username NVARCHAR(20) NULL, " +
                "created INTEGER NOT NULL" +
                ")");
  
  appsql3DB.run("CREATE TABLE IF NOT EXISTS toursTableTest (" +
                "tourname VARCHAR(20) NOT NULL, " +
                "lngCenter REAL NOT NULL, " +
                "latCenter REAL NULL, " +
                //https://stackoverflow.com/a/54428694
                "points TEXT NULL, " +
                //https://www.sqlite.org/foreignkeys.html
                //https://www.sqlitetutorial.net/sqlite-foreign-key/
                "owner NVARCHAR(20) NOT NULL, " +
                "created INTEGER NULL, " +
                "FOREIGN KEY(owner) REFERENCES usersTableTest(email) " +
                ")");

  appsql3DB.run("CREATE TABLE IF NOT EXISTS toursbyusersTableTest (" +
                "owner NVARCHAR(20) NOT NULL, " +
                "tour INTEGER NOT NULL, " +
                "FOREIGN KEY (owner) REFERENCES usersTableTest(email), " +
                "FOREIGN KEY (tour) REFERENCES toursTableTest(id) " +
                ")");
  
  //https://www.tutorialspoint.com/sqlite/sqlite_indexed_by.htm
  appsql3DB.run("CREATE INDEX toursbyusersIndexTest ON toursbyusersTableTest (owner, tour)")
  
  var stmt1 = appsql3DB.prepare("INSERT INTO usersTableTest VALUES (?,?,?,?)"); //,?,?,?,?,?
  for (var i = 0; i < 10; i++) {
      stmt1.run(
               [
                "Ipsum" + i,
                "ipsum"+i+"@mail.com",
                "",
                new Date()
                //"ipsumipsum" + i, "muspi", "12332efvmertpgertregytn9tgvmt9gfgwert458ug"+i, new Date()
                ]
                );
      //stmt.run("Ipsum" + i);
      //stmt.run("Ipsum" + i);
      //stmt.run("Ipsum" + i);
  }
  stmt1.finalize();
  
  // Dealing with transactions
  //-- https://stackoverflow.com/questions/53299322/transactions-in-node-sqlite3
  //-- https://github.com/mapbox/node-sqlite3/issues/773#issuecomment-279899689
  
  var tour;
  var owner;
  
  let statements = [
                        ["INSERT INTO toursTableTest VALUES ("+tour+","+77.3+","+88.4+",'',"+owner+","+new Date()+")"],
                        ["INSERT INTO toursbyusers VALUES ("+tour+","+owner+")"]
                   ]
  for(let i = 0; i < 50; i++){
    let tour = "Lorem"+i;
    let owner = "ipsum"+ Math.floor(Math.random()*(10)) + "@mail.com";
    (function(statements, tour, owner){
      //console.log(statements);
      //console.log("INSERT INTO toursTableTest VALUES ("+tour+","+77.3+","+88.4+",'',"+owner+","+new Date()+")");
      appsql3DB.serialize(()=>{
        let a = "test"
        //creation of a tour
        appsql3DB
                .run('BEGIN TRANSACTION')
                .run("INSERT INTO toursTableTest (tourname, lngCenter, latCenter, owner, created) VALUES ('" + tour + "'," + 77.3 + "," + 88.4 + ",'" + owner + "'," + new Date().getTime() + ")") // new Date().getTime()
                //.run("INSERT INTO toursTableTest (tourname) VALUES ('"+tour+"')") //test
                .run("INSERT INTO toursbyusersTableTest VALUES ('"+owner+"','"+tour+"')")
                .run('COMMIT')
      })
     })(statements, tour, owner);
  };
  
  //var stmt2 = appsql3DB.prepare("INSERT INTO toursTableTest VALUES (?,?,?,?,?,?)"); //,?,?,?,?,?
  //for (var i = 0; i < 50; i++) {
  //    stmt2.run(
  //             [
  //              "Lorem" + i,
  //              77.3,
  //              88.4,
  //              '',
  //              //Math.floor(Math.random()*(9-0+1))+0,
  //              "ipsum"+ Math.floor(Math.random()*(10)) + "@mail.com",
  //              new Date()
  //              //"ipsumipsum" + i, "muspi", "12332efvmertpgertregytn9tgvmt9gfgwert458ug"+i, new Date()
  //              ]
  //              );
  //    //stmt.run("Ipsum" + i);
  //    //stmt.run("Ipsum" + i);
  //    //stmt.run("Ipsum" + i);
  //}
  //stmt2.finalize();

  //var stmt3 = appsql3DB.prepare("INSERT INTO toursbyusersTableTest VALUES (?,?)"); //,?,?,?,?,?
  //for (var i = 0; i < 50; i++) {
  //    stmt3.run(
  //             [
  //              "Lorem" + i,
  //              77.3,
  //              88.4,
  //              '',
  //              //Math.floor(Math.random()*(9-0+1))+0,
  //              "ipsum"+ Math.floor(Math.random()*(10)) + "@mail.com",
  //              ]
  //              );
  //    //stmt.run("Ipsum" + i);
  //    //stmt.run("Ipsum" + i);
  //    //stmt.run("Ipsum" + i);
  //}
  //stmt3.finalize();
  
  
  
  appsql3DB.each("SELECT rowid AS id, name, email, created FROM usersTableTest", (err, row)=>{
      //console.log(row.id + ": " + row.name + ", " + row.email+ ", " + row.created ); //+ ", " + row.email + ", " + row.username
  });
  
  appsql3DB.each("SELECT * FROM toursTableTest", (err, row)=>{
      //console.log(row); //+ ", " + row.email + ", " + row.username
  });
  
  appsql3DB.each("SELECT owner, tour FROM toursbyusersTableTest ORDER BY owner, tour", (err, row)=>{
      //console.log(row); //+ ", " + row.email + ", " + row.username
  });
  
  //appsql3DB.each("SELECT rowid AS id, info FROM lorem", (err, row)=>{
  //    console.log(row.id + ": " + row.info);
  //});
  //console.log(2222);
  
});

//appsql3DB.close(()=>{
//    console.log('Successfully closing tours.db')},
//    (err)=>{console.error('An error occurred when closing tours.db: ', err)
//  });


////GET tours
//appsql3DB = new sqlite3.Database(path.join(__dirname,'testfiles/tours.db'),
//                                 ()=>{
//                                    console.log('Successfully opening tours.db'),
//                                    (err)=>{console.error('An issue was found opening tours.db: ', err)}
//                                  }
//                                );
//appsql3DB.each("SELECT * FROM toursTableTest",
//               (err, row)=>{
//                console.log(row); //+ ", " + row.email + ", " + row.username
//        });
//
//appsql3DB.close(()=>{
//    console.log('Successfully closing tours.db')},
//    (err)=>{console.error('An error occurred when closing tours.db: ', err)
//  });
/**************/
/*** better-sqlite3 ***/
/**************/
/* DIDNT INSTALL; POOR DOCS */
//--https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md
//const bsql3DB = require('better-sqlite3');
//const appbsql3DB = new bsql3DB('toursDB.db', { verbose: console.log });




////////////////////////////////

module.exports = {
    usersDB,
    toursDB,
    pointsDB,
    //applfDB,
    appsql3DB,
}
