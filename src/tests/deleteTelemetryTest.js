console.log('-----\n----------------------------------\n-----');

require('dotenv').config();
const deleteTelemetry = require('../deleteTelemetry.js');

// valores
const { entityType,entityId,keys,deleteAllDataForKeys,startTs,endTs,rewriteLatestIfDeleted,authorizationToken } = process.env;

deleteTelemetry(entityType, entityId, keys, deleteAllDataForKeys, startTs, endTs, rewriteLatestIfDeleted, authorizationToken)
.then(response => {
    console.log(response);
    console.log('Telemetry deleted successfully')
})
.catch(e => {
    console.log(e);
    console.log('Error on deletion')
})