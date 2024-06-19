const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./Model/config');
app.use(bodyParser.json());
const router = require('./Routes/userRoutes');


app.use('/', router);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server run in port no :'${process.env.PORT}`)
})