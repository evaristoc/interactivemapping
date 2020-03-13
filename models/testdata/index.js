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

module.exports = {
    usersDB,
    toursDB,
    pointsDB
}

//////////////////////////////////////////////////////
//https://itnext.io/indexeddb-your-second-step-towards-progressive-web-apps-pwa-dcbcd6cc2076
//https://github.com/google/lovefield
//https://github.com/google/lovefield/blob/master/demos/todo/README.md
//https://stackoverflow.com/questions/31378997/express-js-limit-api-access-to-only-pages-from-the-same-website


