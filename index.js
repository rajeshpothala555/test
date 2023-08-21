const express = require('express');
const app = express();
const apicall = require('./router/datarouter')
app.use(express.json());
app.use('/',apicall);

app.listen(3000,()=>{
    console.log("app listen 3000 Port")
})