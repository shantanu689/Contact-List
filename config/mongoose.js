const mongoose =require('mongoose');

mongoose.connect("mongodb://localhost/contacts_list");
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to database!"));
db.once('open',()=>{
    console.log("Database successfully connected!");
})