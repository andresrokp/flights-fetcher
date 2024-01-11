console.log('-----\n----------------------------------\n-----');
const getBearerToken = require('../getBearerToken.js');

getBearerToken().then((token)=>{console.log(token);})
