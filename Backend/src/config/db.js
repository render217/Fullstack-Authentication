const mongoose = require('mongoose')

const connectDB = async(uri=process.env.MONGO_URI,opt={}) =>{
    try{
        const conn = mongoose.connect(uri,opt);
        console.log('connected to db');
        return conn;
    }catch{
        console.log('unable to connect to db')
        process.exit(1);
    }
}
module.exports = connectDB;