const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development_3');


const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log("Connected to the database::MONGO_DB");

});

module.exports=db;

