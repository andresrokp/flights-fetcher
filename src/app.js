require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fetchFromApi = require('./fetchFromApi.js');
const deleteTelemetry = require('./deleteTelemetry.js');
const getBearerToken = require('./getBearerToken.js');


const { entityType,entityId,keys,deleteAllDataForKeys,startTs,endTs,rewriteLatestIfDeleted,authorizationToken } = process.env;

const app = express(); // ejecuta express y asigna el servidor a la variable app
app.use(express.json()); // decirle a la app que va a parsear JSON
app.use(cors())

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor escuchando. Puerto ${process.env.PORT}`);
})

function getRand(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error('Both parameters must be integers');
    }

    if (a > b) {
        throw new Error('The first parameter (a) must be less than or equal to the second parameter (b)');
    }

    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function getRandMillis() {
    return getRand(10,20)*1000+getRand(1,1000);
}

let bearerToken;

app.get('/',async (req,res)=>{

    console.log('\n:: New request :: ', new Date(), '::');
    
    try{
        await deleteTelemetry(entityType, entityId, keys, true, 0, Date.now(), rewriteLatestIfDeleted, bearerToken);
    }catch(e){
        console.error(e);
        console.log('...Trying again...')
        bearerToken = await getBearerToken();
        await deleteTelemetry(entityType, entityId, keys, true, 0, Date.now(), rewriteLatestIfDeleted, bearerToken);
    }
        
    const data_p1 = await fetchFromApi(1);
    await new Promise((res,rej)=>{setTimeout(() => {res()},getRandMillis() );})
    const data_p12 = data_p1.concat(await fetchFromApi(2));
    await new Promise((res,rej)=>{setTimeout(() => {res()},getRandMillis() );})
    const data_p123 = data_p12.concat(await fetchFromApi(3));
    await new Promise((res,rej)=>{setTimeout(() => {res()},getRandMillis() );})
    const data_p1234 = data_p123.concat(await fetchFromApi(4));
    
    console.log('...Sending data...');
    res.json(data_p1234);
})