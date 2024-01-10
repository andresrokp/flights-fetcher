require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fetchFromApi = require('./fetchFromApi.js');
const deleteTelemetry = require('./deleteTelemetry.js');

const { entityType,entityId,keys,deleteAllDataForKeys,startTs,endTs,rewriteLatestIfDeleted,authorizationToken } = process.env;

const app = express(); // ejecuta express y asigna el servidor a la variable app
app.use(express.json()); // decirle a la app que va a parsear JSON
app.use(cors())

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor escuchando. Puerto ${process.env.PORT}`);
})

app.get('/',async (req,res)=>{
    await deleteTelemetry(entityType, entityId, keys, true, 0, Date.now(), rewriteLatestIfDeleted, authorizationToken);
    console.log('Telemetry deleted successfully');
    const data = await fetchFromApi(3);
    // console.log(data);
    res.json(data)
})