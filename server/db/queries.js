// create db
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/data',{useNewUrlParser: true, useUnifiedTopology: true});
var  db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',function(){
 console.log("connection")
});
//___________________________________________________________________________________________________
// var Schema = mongoose.Schema;
const queries = mongoose.Schema({
    bugName: Number,
    bugDescription: String,
    reportedBy: String,
    createdDate: Number,
    assignedTo: String,
    threatLevel: String
});

module.exports = mongoose.model('data',queries);
