const express = require('express');

const app = express();


app.get('/', (req, res)=>{
    res.send('hello');
});







const port = 8080;

app.listen(port, ()=>{
    console.log(`server is listenig http://localhost:${port}`)
});