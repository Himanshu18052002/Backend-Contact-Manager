const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Data Base Connected Succesfully of host: " + connect.connection.host + " with the Data base name as "+ connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;