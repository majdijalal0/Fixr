const mongoose = require('mongoose')

const connectdb = async() =>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongo db connected')
    }
    catch(err){
        console.log(`Mongodb failed connection  ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectdb