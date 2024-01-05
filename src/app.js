require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fetchFromApi = require('./fetchFromApi.js');

const app = express(); // ejecuta express y asigna el servidor a la variable app
app.use(express.json()); // decirle a la app que va a parsear JSON
app.use(cors())

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor escuchando. Puerto ${process.env.PORT}`);
})

app.get('/',async (req,res)=>{
    const data = await fetchFromApi();
    console.log(data);
    res.json(data)
})