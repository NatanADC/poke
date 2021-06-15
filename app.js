const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res)=>{
    //req rquest peticion 
    //res respuesta 
    res.status(200).send('Hello world')
});

app.listen(port, ()=>{
    console.log('Server started at port 3000');
})