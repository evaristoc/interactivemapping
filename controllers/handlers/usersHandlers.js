const usersDB = require('../../models/testdata/usersDB');
module.exports.findAll = usersDB.testUsersDB.selectall;


const applfDB = require('../../models/testdata/').applfDB;

module.exports.usersHandler = {
    create: (req)=>{
        applfDB
            .connect()
            .then((db)=>{
                let users = db.getSchema().table('usersDB');
                let row = item.createRow({
                  'userid': 1,
                  'name': 'Aname',
                  'email': 'aname@email.com',
                  'username': 'ausername',
                  'passport': 'yeah',
                  'saltedpassport': 'hmmm',
                  'created': new Date()
                });
                return db
                        .insertOrReplace()
                        .into(users)
                        .values([row])
                        .exec();
            })
    }
}
