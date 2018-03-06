 var secureRandom = require('secure-random');
 var signinKey = secureRandom(256, {type: 'Buffer'});

module.exports = {
    'serverport': 1978,
    'tokenexp': 3600,
    'secret': signinKey,
    'database': 'mongodb://localhost:27017/angular2'
};