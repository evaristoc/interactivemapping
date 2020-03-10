const axios = require('axios').default;

// Make a request for a user with a given ID
module.exports.testUsersDB = {
    
    selectall : (cb)=>{
    console.log('in selectall')
    return new Promise((resolve, reject) => { axios.get('https://raw.githubusercontent.com/jonasschmedtmann/complete-node-bootcamp/master/4-natours/after-section-06/dev-data/data/users.json')
                                                    .then(function (response) {
                                                      // handle success
                                                     resolve(response.data);
                                                    })
                                                    .catch(function (error) {
                                                      // handle error
                                                      reject(console.log(error));
                                                    })
                                                    .finally(function () {
                                                      // always executed
                                                    })
    }
  )}
}

