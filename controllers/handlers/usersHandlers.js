const usersDB = require('../../models/testdata/usersDB');

module.exports = {
    findAll : usersDB.testUsersDB.selectall, 
};