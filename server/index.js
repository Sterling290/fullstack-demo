//import quries from("./quries")
const express = require('express');
//____________________________________
const queries = require('./db/queries')
//____________________________________
const app = express()
var cors = require('cors')
const bodyparser = require("body-parser")
const port = 3000;
app.use(cors())
app.use(bodyparser.json());
app.get("/api/data",(req,res) => {
queries.find()
.then((something)=>{
    //console.log(req)
    //console.log(req.body)
    res.send(something)
})  
});
//its in mongoose
app.post("/api/data",(req,res) => {
queries.create(req.body)
.then(res.send(req.body))
})

app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;






