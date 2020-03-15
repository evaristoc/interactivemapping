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
//... plus GraphQL + Apollo + Vue.js
//https://dev.to/jgilbertcastro/build-a-simple-blog-with-graphql-node-js-sqlite-and-vue-angular-or-reactjs-3923
//https://dev.to/jgilbertcastro/build-a-simple-blog-with-graphql-node-js-sqlite-and-vue-angular-or-reactjs-part-2-201j

/**************/
/*** better-sqlite3 ***/
/**************/
//https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md




////////////////////////////////

module.exports = {
    usersDB,
    toursDB,
    pointsDB,
    //applfDB
}
