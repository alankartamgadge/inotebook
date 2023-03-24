const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27019/reactdb?replicaSet=rs0"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;