const mongoose = require("mongoose");

const MongoUri = process.env.MONGOURI;

const dbConnection = () =>{
    mongoose.connect(MongoUri).then(()=>{console.log("database connection successful")})
    .catch(()=>{console.log("databse connection dismiss")});
}

module.exports = dbConnection;